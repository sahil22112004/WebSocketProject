import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuards } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any, @Res({ passthrough: true }) res: any) {
    return this.authService.login(req.user, req, res);
  }

  @UseGuards(AuthGuards)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.session.user;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
