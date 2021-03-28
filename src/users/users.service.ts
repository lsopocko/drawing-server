import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

function randomId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

@Injectable()
export class UsersService {
  private currentRoomId = 0;
  private users: any[] = [];
  private usersStream: Subject<any[]> = new Subject();

  public getUsersStream(): Observable<any[]> {
    return this.usersStream.asObservable();
  }

  public addUser(name, color, clientId, roomId = randomId()): string {
    let user = this.getUserByClientId(clientId);

    if (!user) {
      user = {
        name,
        color,
        clientId,
        roomId,
      };

      this.users.push(user);
      this.usersStream.next(this.users);
    } else {
      user.name = name;
      user.color = color;
    }

    return roomId;
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
