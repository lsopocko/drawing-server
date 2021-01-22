import { Injectable } from '@nestjs/common';
import { listenerCount } from 'process';

@Injectable()
export class UsersService {
  private users: any[] = [];

  public addUser(name, color, clientId): void {
    let user = this.getUserByClientId(clientId);

    if (!user) {
      user = {
        name,
        color,
        clientId,
      };

      this.users.push(user);
    } else {
      user.name = name;
      user.color = color;
    }
  }

  public getUsers(): any[] {
    return this.users;
  }

  public getUserByClientId(clientId): any {
    return this.users.find((user) => {
      return user.clientId === clientId;
    });
  }
}
