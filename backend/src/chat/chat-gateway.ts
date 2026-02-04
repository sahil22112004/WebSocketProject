// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
//   ConnectedSocket,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets'
// import { Server, Socket } from 'socket.io'
// import { InjectRepository } from '@nestjs/typeorm'
// import { Repository } from 'typeorm'
// import { UserSessions } from './entities/chat.entity'

// @WebSocketGateway(3002, {
//   cors: { origin: '*' },
// })
// export class ChatGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   constructor(
//     @InjectRepository(UserSessions)
//     private sessionRepo: Repository<UserSessions>,
//   ) {}

//   @WebSocketServer()
//   server: Server

//   private takeoverCodes = new Map<string, string>()

//   async handleConnection(client: Socket) {}

//   async handleDisconnect(client: Socket) {
//     await this.sessionRepo.delete({ sessionId: client.id })
//   }

//   @SubscribeMessage('login')
//   async handleLogin(
//     @MessageBody() userId: string,
//     @ConnectedSocket() client: Socket,
//   ) {

//      console.log('comming in this block',userId)
//     const count = await this.sessionRepo.count({ where: { userId } })

//     console.log('comming in this block',userId)

//     if (count < 2) {
//       await this.sessionRepo.save({
//         userId,
//         sessionId: client.id,
//       })

//       client.emit('login_success')
//       return
//     }

//     const code = Math.floor(1000 + Math.random() * 9000).toString()
//     this.takeoverCodes.set(userId, code)

//     const sessions = await this.sessionRepo.find({ where: { userId } })

//     for (const s of sessions) {
//       this.server.to(s.sessionId).emit('takeover_requested', { code });
//     }
//     client.emit('login_blocked')
//   }

//   @SubscribeMessage('submit_code')
//   async handleSubmitCode(
//     @MessageBody() data: { userId: string; code: string },
//     @ConnectedSocket() client: Socket,
//   ) {
//     const storedCode = this.takeoverCodes.get(data.userId)

//     if (storedCode !== data.code) {
//       client.emit('invalid_code')
//       return
//     }

//     const sessions = await this.sessionRepo.find({
//       where: { userId: data.userId },
//     })

//     for (const s of sessions) {
//       const socket = this.server.sockets.sockets.get(s.sessionId)
//       socket?.emit('force_logout')
//       socket?.disconnect()
//     }

//     await this.sessionRepo.delete({ userId: data.userId })

//     await this.sessionRepo.save({
//       userId: data.userId,
//       sessionId: client.id,
//     })

//     this.takeoverCodes.delete(data.userId)

//     client.emit('login_success')
//   }
// }


import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserSessions } from './entities/chat.entity'

@WebSocketGateway(3002, {
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(UserSessions)
    private sessionRepo: Repository<UserSessions>,
  ) {}

  @WebSocketServer()
  server: Server

  private takeoverCodes = new Map<string, string>()

  async handleConnection(client: Socket) {}

  async handleDisconnect(client: Socket) {
    await this.sessionRepo.delete({ sessionId: client.id })
  }

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {

     console.log('comming in this block',userId)
    const count = await this.sessionRepo.count({ where: { userId } })

    console.log('comming in this block',userId)

    if (count < 2) {
      await this.sessionRepo.save({
        userId,
        sessionId: client.id,
      })

      client.emit('login_success')
      return
    }


    const sessions = await this.sessionRepo.find({ where: { userId } })

    for (const s of sessions) {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    this.takeoverCodes.set(code,s.sessionId)
    this.server.to(s.sessionId).emit('takeover_requested', { code });
    }
    client.emit('login_blocked')
  }

  @SubscribeMessage('submit_code')
  async handleSubmitCode(
    @MessageBody() data: { userId: string; code: string },
    @ConnectedSocket() client: Socket,
  ) {
    const storedCode = this.takeoverCodes.has(data.code)

    if (!storedCode) {
      console.log("comming in this")
      client.emit('invalid_code')
      return
    }

     const session :any = this.takeoverCodes.get(data.code)


      const socket = this.server.sockets.sockets.get(session)
      socket?.emit('force_logout')
      socket?.disconnect()

    await this.sessionRepo.delete({ sessionId: session })

    await this.sessionRepo.save({
      userId: data.userId,
      sessionId: client.id,
    })

    this.takeoverCodes.delete(data.code)

    client.emit('login_success')
  }
}

