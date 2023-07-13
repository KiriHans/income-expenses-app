import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DetailsComponent } from 'src/app/income-expense/components/details/details.component';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DetailsActions } from 'src/app/store/actions/income-expense.actions';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let el: DebugElement;

  let compiled: HTMLElement;

  let store: MockStore;

  const initialState = {
    incomeExpense: {
      items: [new IncomeExpense('test', 100, 'income', 'itemId')],
      loading: false,
    },
  } as const;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    compiled = fixture.nativeElement;

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should countain a title', () => {
    const title = el.query(By.css('h4.card-title'));
    expect(title.nativeElement.textContent).toBe('Income expenses details');
  });

  it('should set items and loading variables on component initialization', () => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    expect(component.incomeExpenseItems$).toBeUndefined();
    expect(component.isLoading).toBeUndefined();

    component.ngOnInit();

    expect(component.incomeExpenseItems$()).toBe(initialState.incomeExpense.items);
    expect(component.isLoading()).toBe(initialState.incomeExpense.loading);
  });

  it('should countain a table with', () => {
    const table = el.query(By.css('table.table'));
    const columns = table.queryAll(By.css('th'));
    const expectedColumns = ['Description', 'Amount', 'Type', 'Actions'];

    columns.forEach((column, i) => {
      expect(column.nativeElement.textContent).toBe(expectedColumns[i]);
    });
  });

  it('should render the items from the store in the table', () => {
    const newState = {
      incomeExpense: {
        items: [
          new IncomeExpense('Item 1', 100, 'income', '1'),
          new IncomeExpense('Item 2', 200, 'income', '2'),
          new IncomeExpense('Item 3', 400, 'expense', '3'),
        ],
        loading: false,
      },
    };
    store.setState(newState);
    store.refreshState();
    fixture.detectChanges();

    const tableElements = el.queryAll(By.css('table tbody tr'));

    expect(tableElements).toHaveLength(newState.incomeExpense.items.length);

    tableElements.forEach((element, i) => {
      const [description, amount, type, button] = element.queryAll(By.css('td'));
      const item = newState.incomeExpense.items[i];

      expect(description.nativeElement.textContent).toBe(item.description);
      expect(amount.nativeElement.textContent).toBe(`${item.amount}`);
      expect(type.nativeElement.textContent.trim()).toBe(item.type);
      expect(button.nativeElement.textContent.trim()).toBe('Delete');
    });
  });

  it("Table element should have it's respective class in their type column ", () => {
    let tableElementType = el.queryAll(By.css('table tbody td'))[2];
    const item = { ...initialState.incomeExpense.items[0] };

    expect(tableElementType.nativeElement.textContent.trim()).toBe('income');
    expect(tableElementType.classes['text-success']).toBeTruthy();

    item.type = 'expense';

    const newState = {
      incomeExpense: {
        items: [item],
        loading: false,
      },
    };
    store.setState(newState);
    store.refreshState();
    fixture.detectChanges();

    tableElementType = el.queryAll(By.css('table tbody td'))[2];

    expect(tableElementType.nativeElement.textContent.trim()).toBe('expense');
    expect(tableElementType.classes['text-danger']).toBeTruthy();
  });

  it('should trigger delete method when button is pressed', () => {
    jest.spyOn(component, 'delete');
    const button = el.query(By.css('table button.btn-danger'));
    button.nativeElement.click();

    expect(component.delete).toHaveBeenCalled();
  });

  it('delete method should dispatch its action', () => {
    const incomeExpense = component.incomeExpenseItems$();
    const itemId = incomeExpense[0].id || '';
    jest.spyOn(store, 'dispatch');
    component.delete(itemId);

    expect(store.dispatch).toHaveBeenCalledWith(
      DetailsActions.deleteItem({ incomeExpense, itemId })
    );
  });

  it('delete method should not dispatch any action if item id does not exist', () => {
    const item = { ...initialState.incomeExpense.items[0] };
    item.id = undefined;

    jest.spyOn(store, 'dispatch');

    const newState = {
      incomeExpense: {
        items: [item],
        loading: false,
      },
    };
    store.setState(newState);
    store.refreshState();
    fixture.detectChanges();

    const button = el.query(By.css('table button.btn-danger'));
    button.nativeElement.click();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
