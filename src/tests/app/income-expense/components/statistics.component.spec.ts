import { CurrencyPipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgChartsModule } from 'ng2-charts';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { StatisticsComponent } from 'src/app/income-expense/components/statistics/statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let currencyPipe: CurrencyPipe;

  let store: MockStore;

  const initialState = {
    incomeExpense: {
      items: [
        new IncomeExpense('Test 1', 100, 'income'),
        new IncomeExpense('Test 2', 200, 'income'),
        new IncomeExpense('Test 3', 400, 'expense'),
      ],
      loading: false,
    },
  } as const;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatisticsComponent, NgChartsModule],
      providers: [provideMockStore({ initialState }), CurrencyPipe],
    });
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    compiled = fixture.nativeElement;

    store = TestBed.inject(MockStore);
    currencyPipe = TestBed.inject(CurrencyPipe);

    window.ResizeObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should contain an income card that shows the total income of the user', () => {
    const totalIncome = component.totalIncome();
    const numberItems = component.numberIncomeItems();
    const incomeCard = el.query(By.css('.income-card'));

    expect(incomeCard).toBeTruthy();

    const title = incomeCard.query(By.css('div.float-right p'));
    const totalIncomeCard = incomeCard.query(By.css('h3'));
    const numberItemsCard = incomeCard.query(By.css('p.text-muted'));

    expect(title.nativeElement.textContent).toBe('Income');
    expect(totalIncomeCard.nativeElement.textContent.trim()).toBe(
      `${currencyPipe.transform(totalIncome)}`
    );
    expect(numberItemsCard.nativeElement.textContent.trim()).toBe(`${numberItems} items`);
  });

  it('should contain an expense card that shows the total expense of the user', () => {
    const totalExpense = component.totalExpense();
    const numberItems = component.numberExpenseItems();
    const expenseCard = el.query(By.css('.expense-card'));

    expect(expenseCard).toBeTruthy();

    const title = expenseCard.query(By.css('div.float-right p'));
    const totalExpenseCard = expenseCard.query(By.css('h3'));
    const numberItemsCard = expenseCard.query(By.css('p.text-muted'));

    expect(title.nativeElement.textContent).toBe('Expense');
    expect(totalExpenseCard.nativeElement.textContent.trim()).toBe(
      `${currencyPipe.transform(totalExpense)}`
    );
    expect(numberItemsCard.nativeElement.textContent.trim()).toBe(`${numberItems} items`);
  });

  it('should contain an difference card that shows the total difference of the user', () => {
    const differenceIncome = component.differenceIncome();
    const differenceCard = el.query(By.css('.difference-card'));

    expect(differenceCard).toBeTruthy();

    const title = differenceCard.query(By.css('div.float-right p'));
    const totalDifferenceCard = differenceCard.query(By.css('h3'));

    expect(title.nativeElement.textContent).toBe('Difference');
    expect(totalDifferenceCard.nativeElement.textContent.trim()).toBe(
      `${currencyPipe.transform(differenceIncome)}`
    );
  });

  it('Total difference should have its respective class depending if the difference is positive or not', () => {
    let totalDifferenceCard = el.query(By.css('.difference-card h3'));

    expect(totalDifferenceCard.classes['text-danger']).toBeTruthy();

    store.setState({
      incomeExpense: {
        items: [
          new IncomeExpense('Test 1', 100, 'income'),
          new IncomeExpense('Test 2', 200, 'income'),
          new IncomeExpense('Test 3', 150, 'expense'),
        ],
        loading: false,
      },
    });

    store.refreshState();

    fixture.detectChanges();

    totalDifferenceCard = el.query(By.css('.difference-card h3'));

    expect(totalDifferenceCard.classes['text-success']).toBeTruthy();
  });

  it('should contain a graphic that shows the data', () => {
    const chartCard = el.query(By.css('.graphic-card'));

    expect(chartCard).toBeTruthy();

    const title = chartCard.query(By.css('h1'));
    const chart = chartCard.query(By.css(`canvas`));

    expect(title.nativeElement.textContent).toBe('Graphic');
    expect(chart.classes['chart']).toBeTruthy();
  });

  it('should generate a correct dataset depending of the user income-expense', () => {
    const totalIncome = component.totalIncome();
    const totalExpense = component.totalExpense();
    const charData = component.doughnutChartData();
    const dataset = charData.datasets[0];

    expect(dataset.data).toEqual([totalIncome, totalExpense]);
  });
});
