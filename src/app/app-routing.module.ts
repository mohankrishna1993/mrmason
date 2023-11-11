import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardPannelComponent } from './components/dashboard-pannel/dashboard-pannel.component';
import { ServicePersonPageComponent } from './components/service-person-page/service-person-page.component';
import { ServiceRequestPageComponent } from './components/service-request-page/service-request-page.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerfiyOtpComponent } from './components/verfiy-otp/verfiy-otp.component';
import { EcDashboardComponent } from './components/ec-dashboard/ec-dashboard.component';
import { EcDashboardPannelComponent } from './components/ec-dashboard-pannel/ec-dashboard-pannel.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

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
  { path: 'service-request',component: ServiceRequestComponent },
  { path: 'verify-otp',component: VerfiyOtpComponent},
  { path: 'ec-dashboard',component: EcDashboardComponent,
     children: [
      {path: '',redirectTo: 'ec-dashboard-pannel', pathMatch: 'full' },
      {path: 'ec-dashboard-pannel',component: EcDashboardPannelComponent},
      {path: 'update-profile',component: UpdateProfileComponent},
      { path: 'service-request-page', component: ServiceRequestPageComponent}
     ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
