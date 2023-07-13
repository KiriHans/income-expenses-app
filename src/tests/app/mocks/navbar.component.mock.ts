import { Component, Input } from '@angular/core';
import { UserApp } from 'src/app/core/models/users.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `<div class="navbar">{{ user.displayName }}, {{ user.email }}</div>`,
})
export class NavbarMockComponent {
  @Input() user!: UserApp;
}
