import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserApp } from 'src/app/core/models/users.model';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    component.user = new UserApp('123', 'test', 'name@test.com');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
