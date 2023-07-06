import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let store: MockStore;
  const initialState = { user: { loading: false } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
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
    // expect(compiled).toMatchSnapshot();
  });

  it('should render a form with email and password inputs', () => {
    const logInTitle = el.query(By.css('h2'));
    const loginForm = el.query(By.css('form'));
    const [emailInput, passwordInput] = el.queryAll(By.css('.form-group>input'));
    console.log([emailInput, passwordInput]);
  });
});
