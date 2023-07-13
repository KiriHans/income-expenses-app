import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Firestore } from '@angular/fire/firestore';
import { IncomeExpenseComponent } from 'src/app/income-expense/components/income-expense.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IncomeExpense } from 'src/app/core/models/income-expenses.model';
import { IncomeExpenseActions } from 'src/app/store/actions/income-expense.actions';

describe('IncomeExpenseComponent', () => {
  let component: IncomeExpenseComponent;
  let fixture: ComponentFixture<IncomeExpenseComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let store: MockStore;

  const initialState = {
    incomeExpense: {
      items: [],
      loading: false,
    },
  } as const;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncomeExpenseComponent],
      providers: [provideMockStore({ initialState }), { provide: Firestore, useValue: {} }],
    });
    fixture = TestBed.createComponent(IncomeExpenseComponent);
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

  it('should render a form with email and password inputs', () => {
    const title = el.query(By.css('h4'));
    const paragraph = el.query(By.css('p.card-description'));
    const form = el.query(By.css('form'));
    const [description, amount] = el.queryAll(By.css('.form-group input'));
    const type = el.query(By.css('.form-group button'));

    expect(title.nativeElement.textContent).toBe('Add Income / Expenses');
    expect(form.nativeElement.textContent).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toBe('Specify amount and type');

    expect(description.name).toBe('input');
    expect(description.attributes['type']).toBe('text');
    expect(description.attributes['formControlName']).toBe('description');
    expect(description.attributes['placeholder']).toBe('Description');

    expect(amount.name).toBe('input');
    expect(amount.attributes['type']).toBe('number');
    expect(amount.attributes['formControlName']).toBe('amount');
    expect(amount.attributes['placeholder']).toBe('Amount');

    expect(type.name).toBe('button');
    expect(type.nativeElement.textContent.trim()).toBe('Income');
  });

  it("should contain inside each field it's respective label", () => {
    const descriptionLabel = el.query(By.css('.form-group label[for="description"]'));
    const amountLabel = el.query(By.css('.form-group label[for="amount"]'));
    const typeLabel = el.query(By.css('.form-group label[for="type"]'));

    expect(descriptionLabel).toBeTruthy();
    expect(descriptionLabel.name).toBe('label');

    expect(amountLabel).toBeTruthy();
    expect(amountLabel.name).toBe('label');

    expect(typeLabel).toBeTruthy();
    expect(typeLabel.name).toBe('label');
  });

  it('should have a button that is disabled when form is invalid', () => {
    const submitButton = el.query(By.css('button.btn-success'));

    expect(submitButton.nativeElement.disabled).toBeTruthy();
    expect(submitButton.name).toBe('button');
    expect(submitButton.nativeElement.textContent.trim()).toBe('Add');
  });

  it('should have a cancel button that resets the information in the form', () => {
    const cancelButton = el.query(By.css('button[type="reset"]'));

    expect(cancelButton.name).toBe('button');
    expect(cancelButton.nativeElement.textContent.trim()).toBe('Cancel');
  });

  it('should enable button when form is valid', () => {
    const submitButton = el.query(By.css('button.btn-success'));

    component.incomeForm.setValue({
      description: 'Test description',
      amount: 100,
    });

    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should change type button when clicked', () => {
    let typeButton = el.query(By.css('.form-group button'));

    expect(typeButton.classes['btn-primary']).toBeTruthy();
    expect(typeButton.nativeElement.textContent.trim()).toBe('Income');

    typeButton.nativeElement.click();

    fixture.detectChanges();

    typeButton = el.query(By.css('.form-group button'));

    expect(typeButton.classes['btn-warning']).toBeTruthy();
    expect(typeButton.nativeElement.textContent.trim()).toBe('Expense');
  });

  it('should change type value when type button is clicked', () => {
    const typeButton = el.query(By.css('.form-group button'));

    expect(component.type).toBe('income');

    typeButton.nativeElement.click();

    expect(component.type).toBe('expense');
  });

  it('should trigger save method when button is pressed', () => {
    jest.spyOn(component, 'save');
    const button = el.query(By.css('button.btn-success'));

    component.incomeForm.setValue({
      description: 'Test description',
      amount: 100,
    });

    fixture.detectChanges();

    button.nativeElement.click();

    expect(component.save).toHaveBeenCalled();
  });

  it('save method should dispatch its action', () => {
    component.incomeForm.setValue({
      description: 'Test description',
      amount: 100,
    });

    fixture.detectChanges();

    const { description, amount } = component.incomeForm.value;
    const incomeExpense = new IncomeExpense(description, amount, component.type);

    jest.spyOn(store, 'dispatch');
    component.save();

    expect(store.dispatch).toHaveBeenCalledWith(
      IncomeExpenseActions.createIncomeExpenses({ incomeExpense })
    );
  });

  it('should show new button with "waiting..." text while the items is being added', () => {
    let button = el.query(By.css('button.btn-success'));

    component.incomeForm.setValue({
      description: 'Test description',
      amount: 100,
    });

    fixture.detectChanges();

    store.setState({
      incomeExpense: {
        items: [],
        loading: true,
      },
    });

    store.refreshState();

    fixture.detectChanges();

    button = el.query(By.css('button.btn-success'));

    expect(button.nativeElement.textContent.trim()).toBe('Waiting...');
  });
});
