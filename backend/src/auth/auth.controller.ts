import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy'
import { CreateAuthDto } from './dto/create-auth.dto';
// import { updatebanAuthdto } from './dto/update-banAUth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuards } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) { }

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log('work', createAuthDto)
    return this.authService.create(createAuthDto);
  }

  @Get('profile')  
  @UseGuards(AuthGuards)  
  getProfile(@Request() req:any): any {  
  return req.session.user;  
}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  validate(@Request() req: any): any {
    console.log("Controller");
    req.session.user = req.user;
    return { message: 'Login successful',user:req.user };
  }

  @Post()
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch('updateIsBanned/:id')
  // update(@Param('id') id: string, @Body() updateAuthDto: updatebanAuthdto) {
  //   return this.authService.update(id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}