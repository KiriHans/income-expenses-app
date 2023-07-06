import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Firestore } from '@angular/fire/firestore';
import { IncomeExpenseComponent } from 'src/app/income-expense/components/income-expense.component';

describe('IncomeExpenseComponent', () => {
  let component: IncomeExpenseComponent;
  let fixture: ComponentFixture<IncomeExpenseComponent>;

  let store: MockStore;

  const initialState = {
    incomeExpense: {
      items: [],
      loading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncomeExpenseComponent],
      providers: [provideMockStore({ initialState }), { provide: Firestore, useValue: {} }],
    });
    fixture = TestBed.createComponent(IncomeExpenseComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
