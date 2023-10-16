import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicePersonComponent } from './components/service-person/service-person.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '',redirectTo: '/login',pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'dashboard',component: DashboardComponent},
  {path: 'service-person',component: ServicePersonComponent},
  {path: 'service-request',component: ServiceRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
