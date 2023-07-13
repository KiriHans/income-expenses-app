import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { RegisterActions } from '../../../store/actions/auth.actions';
import { authFeature } from 'src/app/store/reducers/auth.reducer';

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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.isLoading = this.store.selectSignal(authFeature.selectLoading);
  }

  createUser(): void {
    if (this.registerForm.invalid) return;
    const { name, email, password } = this.registerForm.value;

    this.store.dispatch(RegisterActions.registerWithEmail({ name, email, password }));
  }
}
