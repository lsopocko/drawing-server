import { UsersService } from './../users/users.service';
import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(BoardGateway.name);

    @WebSocketServer() server;

    public constructor(private usersService: UsersService) {}

    async handleConnection(client) {}

    async handleDisconnect() {}

    @SubscribeMessage('draw')
    async onDraw(client, message){
        const user = this.usersService.getUserByClientId(client.id);
        if (user) {
            client.broadcast.emit('draw', { ...message, user: user });
        }
    }

    @SubscribeMessage('setName')
    async onSetName(client, message){
        this.usersService.addUser(message.name, message.color, client.id);
    }
}