import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log(req.user); // ✅ Now contains id, name, email, jwt

    const { jwt, ...userData } = req.user;

    // Set JWT as a cookie (optional)
    res.cookie('jwt', jwt, { httpOnly: true });

    // Redirect user to frontend with token and user details
    res.redirect(
      `http://localhost:4200/main/oauth-redirect?token=${jwt}&user=${encodeURIComponent(JSON.stringify(userData))}`,
    );
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req, @Res() res) {
    return res.redirect(
      `http://localhost:4200/dashboard?token=${req.user.jwt}`,
    );
  }
}
