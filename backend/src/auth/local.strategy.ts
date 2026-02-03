import { PassportStrategy } from '@nestjs/passport';  
import { Strategy } from 'passport-local';  
import { Injectable, UnauthorizedException } from '@nestjs/common';  
import { AuthService } from './auth.service'; 

@Injectable()  
export class LocalStrategy extends PassportStrategy(Strategy) {  
  constructor(private authService: AuthService) {  
    super({ usernameField: 'email' });  
  }  
  async validate(email:string, password:string) {  
    console.log("Local")
    const user = await this.authService.validateUser(email, password);  
    console.log("User ->", user);
    if (!user) {
      console.log('in this block')  
      throw new UnauthorizedException();  
    }  
    return user;  
  }  
}