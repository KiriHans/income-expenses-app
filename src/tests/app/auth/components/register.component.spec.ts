import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { DumbMockComponent } from '../../mocks/dumb.component.mock';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let store: MockStore;
  const initialState = { user: { loading: false } } as const;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([{ path: 'auth/login', component: DumbMockComponent }]),
      ],
    });
    fixture = TestBed.createComponent(RegisterComponent);
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
    const sigUpTitle = el.query(By.css('h2'));
    const registerForm = el.query(By.css('form'));
    const [nameInput, emailInput, passwordInput] = el.queryAll(By.css('.form-group input'));

    expect(sigUpTitle.nativeElement.textContent).toBe('Register');
    expect(registerForm.nativeElement.textContent).toBeTruthy();

    expect(nameInput.name).toBe('input');
    expect(nameInput.attributes['type']).toBe('text');
    expect(nameInput.attributes['formControlName']).toBe('name');
    expect(nameInput.attributes['placeholder']).toBe('Name');

    expect(emailInput.name).toBe('input');
    expect(emailInput.attributes['type']).toBe('email');
    expect(emailInput.attributes['formControlName']).toBe('email');
    expect(emailInput.attributes['placeholder']).toBe('Email');

    expect(passwordInput.name).toBe('input');
    expect(passwordInput.attributes['type']).toBe('password');
    expect(passwordInput.attributes['formControlName']).toBe('password');
    expect(passwordInput.attributes['placeholder']).toBe('Password');
  });

  it('should have a button that is disabled when form is invalid', () => {
    const submitButton = el.query(By.css('.form-group button.submit-btn'));

    expect(submitButton.nativeElement.disabled).toBeTruthy();
    expect(submitButton.name).toBe('button');
    expect(submitButton.classes['submit-btn']).toBeTruthy();
    expect(submitButton.nativeElement.textContent.trim()).toBe('Create account');
  });

  it('should have a description', () => {
    const descText = el.query(By.css('.text-block span'));

    expect(descText.nativeElement.textContent.trim()).toBe('Already have a new account?');
  });

  it('should have a link that redirects to the register page', () => {
    const link = el.query(By.css('span~a[routerLink="/auth/login"]'));

    (link.nativeElement as HTMLAnchorElement).click();

    expect(TestBed.inject(Router).url).toEqual('/auth/login');
  });

  it('should enable button when form is valid', () => {
    const submitButton = el.query(By.css('.form-group button.submit-btn'));

    component.registerForm.setValue({
      name: 'test',
      email: 'test@email.com',
      password: '123456',
    });

    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should log in user when form is valid and button is pressed', () => {
    const submitButton = el.query(By.css('.form-group button.submit-btn'));
    const registerSpy = jest.spyOn(component, 'createUser');
    const storeSpy = jest.spyOn(store, 'dispatch');

    component.registerForm.setValue({
      name: 'test',
      email: 'test@email.com',
      password: '123456',
    });

    fixture.detectChanges();
    (submitButton.nativeElement as HTMLButtonElement).click();

    expect(registerSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should show new button with "waiting..." text while user is authenticating', () => {
    let submitButton = el.query(By.css('.form-group button.submit-btn'));

    component.registerForm.setValue({
      name: 'test',
      email: 'test@email.com',
      password: '123456',
    });

    fixture.detectChanges();

    store.setState({ user: { loading: true } });

    store.refreshState();

    fixture.detectChanges();

    submitButton = el.query(By.css('.form-group button.submit-btn'));

    expect(submitButton.nativeElement.textContent.trim()).toBe('Waiting...');
  });
});
