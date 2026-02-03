import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
      secret: 'jwtSecretKey',
      signOptions: { expiresIn: '1d' },
    }),

],
  controllers: [AuthController],
  providers: [AuthService ,LocalStrategy],
})
export class AuthModule {}
