import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarLandingComponent } from '../shared/components/navbar-landing/navbar-landing.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, NavbarLandingComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
