import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { uiFeature } from 'src/app/shared/store/ui.reducer';

import { RegisterActions } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: ['input { height: 100% }'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading!: Signal<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.isLoading = this.store.selectSignal(uiFeature.selectIsLoading);
  }

  createUser(): void {
    if (this.registerForm.invalid) return;
    const { name, email, password } = this.registerForm.value;

    this.store.dispatch(RegisterActions.registerWithEmail({ name, email, password }));
  }
}
