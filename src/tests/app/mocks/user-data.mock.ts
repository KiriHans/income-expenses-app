import { UserApp } from 'src/app/core/models/users.model';

export const userMock: UserApp = new UserApp('123', 'test subject', 'user@test.com');
export const guestUserMock: UserApp = new UserApp(null, 'guest', null);
