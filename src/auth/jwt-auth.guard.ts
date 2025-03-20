import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from './request.user.interface.auth';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>(); // ✅ Use the extended type
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      request.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }); // ✅ Attach decoded user info to request
      console.log(request.user);
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired token',
        error.message,
      );
    }
  }

  private extractTokenFromHeader(request: RequestWithUser): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}
