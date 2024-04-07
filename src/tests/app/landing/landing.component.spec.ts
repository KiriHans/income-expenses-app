import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { LandingComponent } from 'src/app/landing/landing.component';
import { DumbMockComponent } from '../mocks/dumb.component.mock';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  let el: DebugElement;

  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [provideRouter([{ path: 'auth/login', component: DumbMockComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should countain a title', () => {
    const title = el.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain(
      'Keep an eye of your finances without effort!'
    );
  });
});
