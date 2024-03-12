import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  GetUserInfo,
  LoginUserDto,
  LoginUserResponceDto,
} from './dto/login-user.dto';
import { CheckNicknameDto } from './dto/check-nickname.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';
import {
  UploadAvatarDto,
  UploadAvatarResponseDto,
} from './dto/upload-avatar.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeNicknameDto } from './dto/change-nickname.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @ApiResponse({ status: 200, type: GetUserInfo })
  @Get('userInfo')
  @UseGuards(AuthGuard)
  async getUserInfo(@Req() request) {
    const { currentUserEmail } = request;

    const user = await this.authService.getUserInfo(currentUserEmail);

    return user;
  }

  @ApiResponse({ status: 201, type: LoginUserResponceDto })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.PASSWORD_SALT),
    );

    const [user, isCreated] = await this.authService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!isCreated) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    };
  }

  @ApiResponse({ status: 200, type: LoginUserResponceDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.getUserByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password || '',
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    };
  }

  @ApiResponse({ status: 200, description: 'Nickname is available' })
  @Post('checkNickname')
  async checkIsAvailableNickname(@Body() checkNicknameDto: CheckNicknameDto) {
    const isAvailable = await this.authService.checkIsAvailableNickname(
      checkNicknameDto.nickname,
    );

    if (isAvailable) {
      throw new HttpException(
        'Nickname already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'Nickname is available' };
  }

  @ApiResponse({ status: 200, type: UploadAvatarResponseDto })
  @Put('changeAvatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadAvatar(@UploadedFile() image: UploadAvatarDto, @Req() request) {
    const { currentUserId } = request;

    const url = await this.cloudinaryService.uploadImage(image);

    await this.authService.updateUser(currentUserId, { avatarUrl: url });

    return { message: 'Avatar uploaded successfully', url };
  }

  @ApiResponse({ status: 200, type: 'StrongMen' })
  @Put('changeNickname')
  @UseGuards(AuthGuard)
  async changeNickname(
    @Body() changeNicknameDto: ChangeNicknameDto,
    @Req() request,
  ) {
    const { currentUserId } = request;

    await this.authService.updateUser(currentUserId, {
      nickname: changeNicknameDto.nickname,
    });

    return { nickname: changeNicknameDto.nickname };
  }

  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @Put('changePassword')
  @UseGuards(AuthGuard)
  async changePassword(@Body() passwordDto: ChangePasswordDto, @Req() request) {
    const { currentUserEmail } = request;

    const user = await this.authService.getUserByEmail(currentUserEmail);

    const isPasswordMatch = await bcrypt.compare(
      passwordDto.newPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(
      passwordDto.newPassword,
      Number(process.env.PASSWORD_SALT),
    );

    await this.authService.updateUser(user.id, { password: hashedPassword });

    return { message: 'Password changed successfully' };
  }

  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteUser(@Req() request) {
    const { currentUserEmail } = request;

    await this.authService.deleteUserByEmail(currentUserEmail);

    return { message: 'User deleted successfully' };
  }
}
