import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';

@Pipe({
  name: 'sortIncomeExpense',
  standalone: true,
})
export class SortIncomeExpensePipe implements PipeTransform {
  transform(items: IncomeExpense[]): IncomeExpense[] {
    return [...items].sort((a) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
