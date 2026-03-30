import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/body/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/body/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }
}
