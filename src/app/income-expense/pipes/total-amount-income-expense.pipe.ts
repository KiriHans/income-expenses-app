import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomeExpenseDifference',
  standalone: true,
})
export class IncomeExpenseDifferencePipe implements PipeTransform {
  transform(totalIncome: number, totalExpense: number): number {
    return totalIncome - totalExpense;
  }
}
