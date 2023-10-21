import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicePersonComponent } from './components/service-person/service-person.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { HomeComponent } from './components/home/home.component';
import { TempComponent } from './components/temp/temp.component';
import { DashboardPannelComponent } from './components/dashboard-pannel/dashboard-pannel.component';
import { ServicePersonPageComponent } from './components/service-person-page/service-person-page.component';
import { ServiceRequestPageComponent } from './components/service-request-page/service-request-page.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard-pannel', pathMatch: 'full' },
      { path: 'dashboard-pannel', component: DashboardPannelComponent },
      { path: 'service-person-page', component: ServicePersonPageComponent},
      { path: 'service-request-page', component: ServiceRequestPageComponent}

    ]
  },
  {path: 'temp', component: TempComponent},
  { path: 'service-person',component: ServicePersonComponent },
  { path: 'service-request',component: ServiceRequestComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
