import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserApp } from 'src/app/core/models/users.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  @Input() user!: UserApp;
}
