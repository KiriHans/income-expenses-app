import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginActions } from 'src/app/store/actions/auth.actions';
import { UserApp } from 'src/app/core/models/users.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() user!: UserApp;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 991px)').pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private store: Store) {}

  logOut(): void {
    this.store.dispatch(LoginActions.logout());
  }
}
