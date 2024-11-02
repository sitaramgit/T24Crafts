import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',  // Adjust for production security
    },
  })
  export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    // Notify artist when a new request is created
    notifyArtist(artistId: number, message: string) {
      this.server.to(`artist_${artistId}`).emit('notification', message);
    }
  
    // Notify manager when a request is approved or rejected
    notifyManager(managerId: number, message: string) {
      this.server.to(`manager_${managerId}`).emit('notification', message);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, payload: { userId: number; role: string }) {
      const room = `${payload.role}_${payload.userId}`;
      client.join(room);
      console.log(`Client ${client.id} joined room ${room}`);
    }

    @SubscribeMessage('requestStatusUpdate')
    async handleRequestStatusUpdate(client: Socket, payload: any) {
      const room = `manager_${payload.managerId}`;
      this.server.to(room).emit('statusUpdate', {
        requestId: payload.requestId,
        status: payload.status,
      });
    }
}