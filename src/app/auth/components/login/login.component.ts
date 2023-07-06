import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginActions } from '../../../store/actions/auth.actions';
import { authFeature } from 'src/app/store/reducers/auth.reducer';

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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.isLoading = this.store.selectSignal(authFeature.selectLoading);
  }

  loginUser() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(LoginActions.loginWithEmail(this.loginForm.value));
  }
}
