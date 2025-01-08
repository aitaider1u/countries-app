import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegionPageComponent } from './pages/region-page/region-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'region/:name',component: RegionPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut vers Home
  { path: '**', redirectTo: '/home' } // Redirection des routes inconnues vers Home
];
