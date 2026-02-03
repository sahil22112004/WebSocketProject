// import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import {Socket,Server} from 'socket.io'
 

// @WebSocketGateway(3002,{})
// export class chatGateWay implements OnGatewayConnection,OnGatewayDisconnect{

//     @WebSocketServer() 
//     server: Server;

//     handleConnection(client: Socket) {
//         console.log('new User connected ',client.id);

//         // client.broadcast.emit('user-joined',{
//         //     message:`user Joined the chat : ${client.id}`
//         // })

        
//         this.server.emit('user-joined',{
//             message:`user Joined the chat : ${client.id} `
//         })
//     }

//     handleDisconnect(client: Socket) {
//         console.log('User disconnected ',client.id)
//         this.server.emit('user-left',{
//             message:`user left the chat : ${client.id}`
//         })
//     }
        
    


//     @SubscribeMessage('newMessage')
//     handleNewMessage(client:Socket ,message:any ){
//         console.log(message)

//         client.emit('reply','This is replay')

//         this.server.emit('reply','brodcasting...')

//     }
// }