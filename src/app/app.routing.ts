import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KwetterCmpComponent } from './kwetter-cmp/kwetter-cmp.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeCmpComponent } from './home-cmp/home-cmp.component';
 
const appRoutes: Routes = [
  { path: '', redirectTo: 'kwetter-cmp', pathMatch: 'full' },
  { path: 'kwetter-cmp', component: KwetterCmpComponent },
  { path: 'home-cmp', component: HomeCmpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '***', redirectTo:'kwetter-cmp'}
];
 
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);