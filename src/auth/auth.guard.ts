import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User unauthorized',
        });
      }

      const jwtData = this.jwtService.verify(token);
      const user = await this.authService.getUserByEmail(jwtData.email);

      if (!user) {
        throw new UnauthorizedException({
          message: 'User unauthorized',
        });
      }

      req.currentUserId = user.id;
      req.currentUserEmail = user.email;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User unauthorized',
      });
    }
  }
}
