import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { incomeExpenseFeature } from 'src/app/store/reducers/income-expense.reducer';
import { DetailsActions } from 'src/app/store/actions/income-expense.actions';
import { SortIncomeExpensePipe } from '../../pipes/sort-income-expense.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, SortIncomeExpensePipe],
  templateUrl: './details.component.html',
  styles: [],
})
export class DetailsComponent implements OnInit {
  incomeExpenseItems$!: Signal<IncomeExpense[]>;
  isLoading!: Signal<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.incomeExpenseItems$ = this.store.selectSignal(incomeExpenseFeature.selectItems);
    this.isLoading = this.store.selectSignal(incomeExpenseFeature.selectLoading);
  }

  delete(itemId: string | null | undefined): void {
    if (!itemId) return;
    const incomeExpense = this.incomeExpenseItems$();
    this.store.dispatch(DetailsActions.deleteItem({ incomeExpense, itemId }));
  }
}
