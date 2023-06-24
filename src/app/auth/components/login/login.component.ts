import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { uiFeature } from 'src/app/shared/store/ui.reducer';
import { LoginActions } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ['input { height: 100% }'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading!: Signal<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.isLoading = this.store.selectSignal(uiFeature.selectIsLoading);
  }

  loginUser() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(LoginActions.loginWithEmail(this.loginForm.value));
  }
}
