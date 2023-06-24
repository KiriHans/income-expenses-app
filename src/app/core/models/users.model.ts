import { DocumentData } from '@angular/fire/firestore';

export const isUser = (x: DocumentData | undefined | null): x is UserApp => {
  return !!x && x['displayName'] !== undefined && x['id'] !== undefined && x['email'] !== undefined;
};

export class UserApp {
  static fromDatabase({
    id,
    displayName,
    email,
  }: {
    id: string;
    displayName: string;
    email: string;
  }) {
    return new UserApp(id, displayName, email);
  }
  constructor(
    public id: string | null,
    public displayName: string | null,
    public email: string | null
  ) {}
}
