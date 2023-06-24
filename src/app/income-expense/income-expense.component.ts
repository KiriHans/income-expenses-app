import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income-expense.component.html',
  styles: [],
})
export class IncomeExpenseComponent {
  incomeForm!: FormGroup;
}
