import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
// import { chatGateWay } from './chat-gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
