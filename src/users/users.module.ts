import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
