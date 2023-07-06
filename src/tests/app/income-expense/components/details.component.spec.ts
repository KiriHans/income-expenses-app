import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Firestore } from '@angular/fire/firestore';
import { DetailsComponent } from 'src/app/income-expense/components/details/details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let store: MockStore;

  const initialState = {
    incomeExpense: {
      items: [],
      loading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [provideMockStore({ initialState }), Firestore],
    });
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
