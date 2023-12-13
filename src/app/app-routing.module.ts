import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { EcServiceRequestComponent } from './ec-service-request/ec-service-request.component';
import { AddAssetsComponent } from './components/add-assets/add-assets.component';
import { EditAssetsComponent } from './components/edit-assets/edit-assets.component';
import { EditAssetsPageComponent } from './components/edit-assets-page/edit-assets-page.component';
import { AddAssetsCategoriesComponent } from './components/add-assets-categories/add-assets-categories.component';
import { ShowAssetsCategoriesComponent } from './components/show-assets-categories/show-assets-categories.component';
import { EditAssetsCategoriesComponent } from './components/edit-assets-categories/edit-assets-categories.component';
import { AddServiceCategoryComponent } from './components/add-service-category/add-service-category.component';
import { ShowServiceCategoryComponent } from './components/show-service-category/show-service-category.component';
import { EditServiceCategoryComponent } from './components/edit-service-category/edit-service-category.component';
import { SearchPersonDetailsComponent } from './components/search-person-details/search-person-details.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerReportsComponent } from './components/customer-reports/customer-reports.component';
import { SpDashboardComponent } from './components/sp-dashboard/sp-dashboard.component';
import { SpRegistrationComponent } from './components/sp-registration/sp-registration.component';
import { SpVerifyOtpComponent } from './components/sp-verify-otp/sp-verify-otp.component';
import { SpLoginComponent } from './components/sp-login/sp-login.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'search-person-details',component: SearchPersonDetailsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'sp-register', component: SpRegistrationComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard-pannel', pathMatch: 'full' },
      { path: 'dashboard-pannel', component: DashboardPannelComponent },
      { path: 'service-person-page', component: ServicePersonPageComponent},
      { path: 'service-request-page', component: ServiceRequestPageComponent},
      { path: 'add-asset-categories',component: AddAssetsCategoriesComponent},
      { path: 'show-asset-categories',component: ShowAssetsCategoriesComponent},
      { path: 'edit-asset-category/:id',component: EditAssetsCategoriesComponent},
      { path: 'add-service-category',component: AddServiceCategoryComponent},
      { path: 'show-service-category',component: ShowServiceCategoryComponent},
      { path: 'edit-service-category/:id',component: EditServiceCategoryComponent},
      { path: 'customer-report',component: CustomerReportsComponent}

    ]
  },
  { path: 'verify-otp',component: VerfiyOtpComponent},
  { path: 'sp-verify-otp',component: SpVerifyOtpComponent},
  { path: 'sp-login',component: SpLoginComponent},
  { path: 'ec-dashboard',
    component: EcDashboardComponent,
     children: [
      {path: '',redirectTo: 'ec-dashboard-pannel', pathMatch: 'full' },
      {path: 'ec-dashboard-pannel',component: EcDashboardPannelComponent},
      {path: 'update-profile',component: UpdateProfileComponent},
      {path: 'ec-service-request', component: EcServiceRequestComponent},
      {path: 'add-assets',component: AddAssetsComponent},
      {path: 'edit-assets',component: EditAssetsComponent},
      {path: 'edit-asset/:id', component: EditAssetsPageComponent},
      {path: 'service-request',component: ServiceRequestComponent}
      // {path: 'add-asset-categories',component: AddAssetsCategoriesComponent},
      // {path: 'show-asset-categories',component: ShowAssetsCategoriesComponent},
      // {path: 'edit-asset-category/:id',component: EditAssetsCategoriesComponent}
     ]},

     { path: 'sp-dashboard', component: SpDashboardComponent,
    children: [

    ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
