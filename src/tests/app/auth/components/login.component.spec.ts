import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { Router, provideRouter } from '@angular/router';
import { DumbMockComponent } from '../../mocks/dumb.component.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let store: MockStore;
  const initialState = { user: { loading: false } } as const;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([{ path: 'auth/register', component: DumbMockComponent }]),
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
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
    const logInTitle = el.query(By.css('h2'));
    const loginForm = el.query(By.css('form'));
    const [emailInput, passwordInput] = el.queryAll(By.css('.form-group input'));

    expect(logInTitle.nativeElement.textContent).toBe('Log in');
    expect(loginForm.nativeElement.textContent).toBeTruthy();

    expect(emailInput.name).toBe('input');
    expect(emailInput.attributes['type']).toBe('email');
    expect(emailInput.attributes['formControlName']).toBe('email');
    expect(emailInput.attributes['placeholder']).toBe('Email');

    expect(passwordInput.name).toBe('input');
    expect(passwordInput.attributes['type']).toBe('password');
    expect(passwordInput.attributes['formControlName']).toBe('password');
    expect(passwordInput.attributes['placeholder']).toBe('*********');
  });

  it("should contain inside each field it's respective label", () => {
    const emailLabel = el.query(By.css('.form-group label[for="email"]'));
    const passwordLabel = el.query(By.css('.form-group label[for="password"]'));
    expect(emailLabel).toBeTruthy();
    expect(emailLabel.name).toBe('label');

    expect(passwordLabel).toBeTruthy();
    expect(passwordLabel.name).toBe('label');
  });

  it('should have a button that is disabled when form is invalid', () => {
    const submitButton = el.query(By.css('.form-group button.submit-btn'));

    expect(submitButton.nativeElement.disabled).toBeTruthy();
    expect(submitButton.name).toBe('button');
    expect(submitButton.classes['submit-btn']).toBeTruthy();
    expect(submitButton.nativeElement.textContent.trim()).toBe('Login');
  });

  it('should have a description', () => {
    const descText = el.query(By.css('.text-block span'));

    expect(descText.nativeElement.textContent.trim()).toBe('Are you not registered yet?');
  });

  it('should have a link that redirects to the register page', () => {
    const link = el.query(By.css('span~a[routerLink="/auth/register"]'));

    (link.nativeElement as HTMLAnchorElement).click();

    expect(TestBed.inject(Router).url).toEqual('/auth/register');
  });

  it('should enable button when form is valid', () => {
    const submitButton = el.query(By.css('.form-group button.submit-btn'));

    component.loginForm.setValue({
      email: 'test@email.com',
      password: '123456',
    });

    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should log in user when form is valid and button is pressed', () => {
    const submitButton = el.query(By.css('.form-group button.submit-btn'));
    const loginSpy = jest.spyOn(component, 'loginUser');
    const storeSpy = jest.spyOn(store, 'dispatch');

    component.loginForm.setValue({
      email: 'test@email.com',
      password: '123456',
    });

    fixture.detectChanges();
    (submitButton.nativeElement as HTMLButtonElement).click();

    expect(loginSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should show new button with "waiting..." text while user is authenticating', () => {
    let submitButton = el.query(By.css('.form-group button.submit-btn'));

    component.loginForm.setValue({
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
