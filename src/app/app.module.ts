import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgOptimizedImage } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { DashboardPannelComponent } from './components/dashboard-pannel/dashboard-pannel.component';
import { ServiceRequestPageComponent } from './components/service-request-page/service-request-page.component';
import { ServicePersonPageComponent } from './components/service-person-page/service-person-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { Loader } from '@googlemaps/js-api-loader';
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




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DashboardPannelComponent,
    ServiceRequestPageComponent,
    ServicePersonPageComponent,
    ForgotPasswordComponent,
    VerfiyOtpComponent,
    EcDashboardComponent,
    EcDashboardPannelComponent,
    UpdateProfileComponent,
    EcServiceRequestComponent,
    AddAssetsComponent,
    EditAssetsComponent,
    EditAssetsPageComponent,
    AddAssetsCategoriesComponent,
    ShowAssetsCategoriesComponent,
    EditAssetsCategoriesComponent,
    AddServiceCategoryComponent,
    ShowServiceCategoryComponent,
    EditServiceCategoryComponent,
    SearchPersonDetailsComponent,
    ServiceRequestComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxPaginationModule,
    NgxGpAutocompleteModule

  ],
  providers: [
    {
      provide: Loader,
      useValue: new Loader({
        apiKey: 'AIzaSyBE49eJ-hTzLNA7IKZ2DOnW-4BBHDzDXlA',
        libraries: ['places']
      })
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
