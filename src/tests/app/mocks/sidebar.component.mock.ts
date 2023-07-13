import { Component, Input } from '@angular/core';
import { UserApp } from 'src/app/core/models/users.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `<div class="sidebar">{{ user.displayName }}, {{ user.email }}</div>`,
})
export class SidebarMockComponent {
  @Input() user!: UserApp;
}
