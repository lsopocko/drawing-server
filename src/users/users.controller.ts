import { UsersService } from './users.service';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  all(): any[] {
    return this.usersService.getUsers();
  }

  @Post()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto): any {
    const roomId = this.usersService.addUser(
      createUserDto.name,
      createUserDto.color,
      createUserDto.clientId,
      createUserDto.roomId,
    );

    console.log(this.usersService.getUsers());
    return { roomId };
  }
}
