import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { WhyEcoGuardComponent } from './pages/why-ecoguard/why-ecoguard.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, 
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'why-ecoguard', component: WhyEcoGuardComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', redirectTo: '/home' } // Redirect unknown routes to home
];
