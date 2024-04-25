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
  UnauthorizedException,
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
  ResetPassword,
  SendResetPasswordCode,
  VarifyResetCode,
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
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './dto/refresh-token.dto';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
    private mailService: NodemailerService,
  ) {}

  @ApiResponse({ status: 200, type: GetUserInfo })
  @Get('userInfo')
  @UseGuards(AuthGuard)
  async getUserInfo(@Req() request) {
    const { currentUserEmail } = request;

    const user = await this.authService.getUserInfo(currentUserEmail);

    return user;
  }

  @ApiResponse({ status: 200, type: RefreshTokenResponseDto })
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const jwtData: { email: string } =
        await this.jwtService.verifyAsync(refreshToken);

      const userByRefreshToken = await this.authService.getUserByEmail(
        jwtData.email,
      );

      if (
        !userByRefreshToken.refreshToken ||
        userByRefreshToken.refreshToken !== refreshToken
      ) {
        throw new UnauthorizedException({ mesaage: 'Wrong refresh token' });
      }

      const { email, id } = userByRefreshToken;

      const newAccessToken = await this.jwtService.signAsync({
        email,
        id,
      });

      const newRefreshToken = await this.jwtService.signAsync(
        {
          email,
        },
        { expiresIn: '48h' },
      );

      this.authService.setNewRefreshToken(email, newRefreshToken);

      return {
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      };
    } catch {
      throw new UnauthorizedException({ mesaage: 'Wrong refresh token' });
    }
  }

  @ApiResponse({ status: 201, type: LoginUserResponceDto })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const [user, isCreated] = await this.authService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!isCreated) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        email: user.email,
      },
      { expiresIn: '48h' },
    );

    this.authService.setNewRefreshToken(user.email, refreshToken);

    return {
      accessToken,
      refreshToken,
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

    const refreshToken = await this.jwtService.signAsync(
      {
        email: user.email,
      },
      { expiresIn: '48h' },
    );

    this.authService.setNewRefreshToken(user.email, refreshToken);

    return {
      accessToken,
      refreshToken,
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
  @UseInterceptors(FileInterceptor('avatarUrl'))
  async uploadAvatar(
    @UploadedFile() avatarUrl: UploadAvatarDto,
    @Req() request,
  ) {
    const { currentUserId } = request;

    const url = await this.cloudinaryService.uploadImage(avatarUrl);

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

  @Post('sendResetPasswordCode')
  @ApiResponse({ status: 200, description: 'Activation code sended to email' })
  async sendResetPasswordCode(
    @Body() resetPasswordEmail: SendResetPasswordCode,
  ) {
    const { email } = resetPasswordEmail;

    const user = await this.authService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const resetPasswordCode = Math.floor(100000 + Math.random() * 900000);

    const jwtResetPasswordCode = await this.jwtService.signAsync(
      {
        resetPasswordCode,
      },
      { expiresIn: '15m' },
    );

    this.authService.updateUser(user.id, {
      resetPasswordCode: jwtResetPasswordCode,
    });

    await this.mailService.sendResetPasswordCode(email, resetPasswordCode);

    this.mailService.sendResetPasswordCode(email, resetPasswordCode);

    return { message: 'Activation code sended to email' };
  }

  @Post('verifyResetCode')
  @ApiResponse({ status: 200, description: 'Code is equal' })
  async verifyResetCode(@Body() verifyResetCodeData: VarifyResetCode) {
    const { email, code } = verifyResetCodeData;
    const user = await this.authService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    let decodedCode: { resetPasswordCode: number };

    try {
      decodedCode = await this.jwtService.verifyAsync(user.resetPasswordCode);
    } catch (error) {
      throw new HttpException('Code is expired', HttpStatus.BAD_REQUEST);
    }

    if (code !== decodedCode.resetPasswordCode) {
      throw new HttpException(
        'The code does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'Code is equal' };
  }

  @Post('resetPassword')
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  async resetPawwsord(@Body() resetPassword: ResetPassword) {
    const { email, code, password } = resetPassword;

    const user = await this.authService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    let decodedCode: { resetPasswordCode: number };

    try {
      decodedCode = await this.jwtService.verifyAsync(user.resetPasswordCode);
    } catch (error) {
      throw new HttpException('Code is expired', HttpStatus.BAD_REQUEST);
    }

    if (code !== decodedCode.resetPasswordCode) {
      throw new HttpException(
        'The code does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));

    const newHashedPassword = await bcrypt.hash(password, salt);

    user.password = newHashedPassword;
    user.resetPasswordCode = null;
    user.save();

    return { message: 'Password changed successfully' };
  }
}
