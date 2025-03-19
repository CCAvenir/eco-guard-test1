import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-eco-guard',
  standalone: true,
  imports: [CommonModule], // Import CommonModule here
  templateUrl: './why-ecoguard.component.html',
  styleUrls: ['./why-ecoguard.component.css']
})
export class WhyEcoGuardComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
