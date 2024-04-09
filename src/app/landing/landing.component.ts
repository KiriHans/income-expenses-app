import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionComponent } from './components/section/section.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, SectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
