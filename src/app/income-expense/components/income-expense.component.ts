import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { IncomeExpenseService } from '../services/income-expense.service';
import { Store } from '@ngrx/store';
import { authFeature } from 'src/app/store/reducers/auth.reducer';
import { IncomeExpenseActions } from 'src/app/store/actions/income-expense.actions';

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income-expense.component.html',
  styles: [],
})
export class IncomeExpenseComponent implements OnInit {
  userId!: Signal<string | null>;
  incomeForm!: FormGroup;
  type: 'income' | 'outcome' = 'income';

  constructor(
    private fb: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],
    });

    this.userId = this.store.selectSignal(authFeature.selectId);
  }

  save() {
    const userId = this.userId();

    if (this.incomeForm.invalid) return;
    if (!userId) return;

    const { description, amount } = this.incomeForm.value;
    const incomeExpense = new IncomeExpense(description, amount, this.type, userId);

    this.store.dispatch(IncomeExpenseActions.createIncomeExpenses({ userId, incomeExpense }));
  }
}
