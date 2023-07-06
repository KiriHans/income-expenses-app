import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import * as Auth from 'src/app/store/reducers/auth.reducer';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let store: MockStore;

  const initialState = {
    user: {
      id: '123',
      displayName: 'test',
      email: 'test@gm.com',
      loading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component.user$());
  });
});
