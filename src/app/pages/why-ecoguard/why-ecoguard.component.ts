import { Component } from '@angular/core';

@Component({
  selector: 'app-why-eco-guard',
  templateUrl: './why-ecoguard.component.html',
  styleUrls: ['./why-ecoguard.component.css']
})
export class WhyEcoGuardComponent {
  toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('show');
    }
  }
}
