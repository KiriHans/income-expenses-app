import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { Router, provideRouter } from '@angular/router';
import { DumbMockComponent } from '../mocks/dumb.component.mock';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { SidebarMockComponent } from '../mocks/sidebar.component.mock';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { NavbarMockComponent } from '../mocks/navbar.component.mock';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let el: DebugElement;

  let compiled: HTMLElement;

  const initialState = {
    user: {
      id: '123',
      displayName: 'test',
      email: 'test@gm.com',
      loading: false,
    },
  } as const;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule],
      declarations: [],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([
          {
            path: '',
            component: DumbMockComponent,
          },
        ]),
      ],
    }).overrideComponent(DashboardComponent, {
      remove: { imports: [SidebarComponent, NavbarComponent] },
      add: { imports: [SidebarMockComponent, NavbarMockComponent] },
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    el = fixture.debugElement;

    compiled = fixture.nativeElement;

    const router = TestBed.inject(Router);

    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should render navbar and sidebar', () => {
    const navbar = el.query(By.css('app-navbar'));
    const sidebar = el.query(By.css('app-sidebar'));

    expect(navbar).toBeTruthy();
    expect(sidebar).toBeTruthy();

    expect(navbar.query(By.css('.navbar'))).toBeTruthy();
    expect(sidebar.query(By.css('.sidebar'))).toBeTruthy();
  });

  it('should get user data in OnInit lifetime', () => {
    expect(component.user$()).toEqual(initialState.user);
  });

  it('should show user name and password in navbar and sidebar', () => {
    const navbar = el.query(By.css('app-navbar .navbar'));
    const sidebar = el.query(By.css('app-sidebar .sidebar'));

    const user = component.user$();

    expect(navbar.nativeElement.textContent).toBe(`${user.displayName}, ${user.email}`);
    expect(sidebar.nativeElement.textContent).toBe(`${user.displayName}, ${user.email}`);
  });

  it('should contain a main-panel and content-wrapper', () => {
    const mainPanel = el.query(By.css('.main-panel'));
    const contentWrapper = el.query(By.css('.content-wrapper'));

    expect(mainPanel).toBeTruthy();
    expect(contentWrapper).toBeTruthy();
  });

  it('should render components inside the content-wrapper', () => {
    const dumb = el.query(By.css('router-outlet ~ app-dumb'));

    expect(dumb).toBeTruthy();
  });
});
