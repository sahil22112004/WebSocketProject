import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';  


@Injectable()  
export class AuthGuards implements CanActivate {  
  canActivate(context: ExecutionContext): boolean {  
    const request = context.switchToHttp().getRequest();  
    console.log(request.session.user)
    return request.session.user ? true : false;  
  }  
}