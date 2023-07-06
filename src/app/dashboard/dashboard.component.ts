import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { UserApp } from '../core/models/users.model';
import { Store } from '@ngrx/store';
import { authFeature } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  user$!: Signal<UserApp>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.selectSignal(authFeature.selectUserState);
  }
}
