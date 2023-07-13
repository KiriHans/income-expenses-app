import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectNumberExpenseItems,
  selectNumberIncomeItems,
  selectTotalExpense,
  selectTotalIncome,
} from 'src/app/store/selectors/income-expense.selectors';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent {
  numberIncomeItems!: Signal<number>;
  numberExpenseItems!: Signal<number>;
  totalIncome!: Signal<number>;
  totalExpense!: Signal<number>;

  differenceIncome!: Signal<number>;

  doughnutChartLabels: string[] = ['Income', 'Expense'];
  doughnutChartData!: Signal<ChartData<'doughnut'>>;
  doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store) {
    this.generateStatistics();
  }

  generateStatistics(): void {
    this.numberIncomeItems = this.store.selectSignal(selectNumberExpenseItems);
    this.numberExpenseItems = this.store.selectSignal(selectNumberIncomeItems);
    this.totalIncome = this.store.selectSignal(selectTotalIncome);
    this.totalExpense = this.store.selectSignal(selectTotalExpense);

    this.differenceIncome = computed(() => this.totalIncome() - this.totalExpense());

    this.doughnutChartData = computed(() => ({
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [this.totalIncome(), this.totalExpense()],
          hoverOffset: 4,
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        },
      ],
    }));
  }
}
