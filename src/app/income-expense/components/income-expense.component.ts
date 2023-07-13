import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeExpense, IncomeExpenseType } from 'src/app/core/models/income-expenses.model';
import { Store } from '@ngrx/store';
import { IncomeExpenseActions } from 'src/app/store/actions/income-expense.actions';
import { incomeExpenseFeature } from 'src/app/store/reducers/income-expense.reducer';

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income-expense.component.html',
  styles: [],
})
export class IncomeExpenseComponent implements OnInit {
  isLoading!: Signal<boolean>;

  incomeForm!: FormGroup;
  type: IncomeExpenseType = 'income';

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(100)]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],
    });

    this.isLoading = this.store.selectSignal(incomeExpenseFeature.selectLoading);
  }

  save(): void {
    if (this.incomeForm.invalid) return;

    const { description, amount } = this.incomeForm.value;
    const incomeExpense = new IncomeExpense(description, amount, this.type);

    this.store.dispatch(IncomeExpenseActions.createIncomeExpenses({ incomeExpense }));
  }
}
