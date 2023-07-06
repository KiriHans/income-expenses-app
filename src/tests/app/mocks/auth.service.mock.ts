import { map, of, shareReplay } from 'rxjs';
import { guestUserMock, userMock } from './user-data.mock';
import { UserApp } from 'src/app/core/models/users.model';

export class AuthServiceMock {
  user$ = of(guestUserMock).pipe(shareReplay(1));
  userid$ = this.user$.pipe(map((user) => user.id));

  initAuth() {
    return jest.fn();
  }

  async createUser(name: string, email: string, password: string) {
    const newUser = new UserApp(`${new Date().getTime()}`, name, email);
    this.user$ = of(newUser).pipe(shareReplay(1));
  }
}
