import { UsersService } from './../users/users.service';
import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(BoardGateway.name);

  @WebSocketServer() server;

  public constructor(private usersService: UsersService) {
    this.usersService.getUsersStream().subscribe(() => {
      this.handleUsersUpdated();
    });
  }

  async handleConnection(@ConnectedSocket() client) {
    this.logger.log('connected', client.id);
  }

  async handleDisconnect() {}

  @SubscribeMessage('draw')
  async onDraw(client, message) {
    const user = this.usersService.getUserByClientId(client.id);
    if (user) {
      client.broadcast.emit('draw', { ...message, user: user });
    }
  }

  @SubscribeMessage('setName')
  async onSetName(client, message) {
    console.log(message.name, message.color, client.id);
    if (message.name && message.color && client.id) {
      this.usersService.addUser(message.name, message.color, client.id);
      client.broadcast.emit('users', { users: this.usersService.getUsers() });
    }
  }

  async handleUsersUpdated(): Promise<void> {
    this.server.emit('users', {
      users: this.usersService.getUsers(),
    });
  }
}
