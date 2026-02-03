import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1104',
      database: 'websocket',
      entities: [User],
      synchronize: false,
      //   ssl: {
      //   rejectUnauthorized: false,
      // },

    }),
    ChatModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
