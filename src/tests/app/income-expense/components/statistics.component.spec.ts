import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StatisticsComponent } from 'src/app/income-expense/components/statistics/statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  let store: MockStore;

  const initialState = {
    incomeExpense: {
      items: [],
      loading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatisticsComponent],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
