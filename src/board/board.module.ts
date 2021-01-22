import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { BoardGateway } from './board.gateway';

@Module({
    providers: [BoardGateway],
    imports: [UsersModule],

})
export class BoardModule {}
