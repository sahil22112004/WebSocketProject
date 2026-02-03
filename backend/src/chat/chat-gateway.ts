import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('User connected:', client.id);

    this.server.emit('user_joined', {
      message: `User joined: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.id);

    this.server.emit('user_left', {
      message: `User left: ${client.id}`,
    });
  }
}
