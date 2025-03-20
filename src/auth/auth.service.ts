import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateOAuthLogin(profile: any, provider: string) {
    const user = await this.userService.findOrCreateUser(profile, provider);
    return this.jwtService.sign({ id: user.providerId, email: user.email });
  }
}
