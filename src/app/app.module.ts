import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component'
import { NgOptimizedImage } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { TempComponent } from './components/temp/temp.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ServiceRequestComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TempComponent,
    DashboardPannelComponent,
    ServiceRequestPageComponent,
    ServicePersonPageComponent,
    ForgotPasswordComponent,
    VerfiyOtpComponent,
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
