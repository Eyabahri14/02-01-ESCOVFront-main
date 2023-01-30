import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { DisplaycovComponent } from './displaycov/displaycov.component';
import { AddcovComponent } from './addcov/addcov.component';
import { AboutComponent } from './about/about.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';

import { OAuthModule } from "angular-oauth2-oidc";
import { ProfileComponent } from './profile/profile.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { GoogleMapsModule } from "@angular/google-maps";
import { CommonModule } from "@angular/common";
import { JwPaginationComponent } from 'jw-angular-pagination';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileAuthComponent } from './auth/profile-auth/profile-auth.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EditCovComponent } from './edit-cov/edit-cov.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from "@angular/cdk/layout";
import { ButtonComponent } from './button/button.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { EditprofileComponent } from './editprofile/editprofile.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    NavComponent,
    DisplaycovComponent,
    AddcovComponent,
    AboutComponent,
    FooterComponent,
    ProfileComponent,
    LoginRegisterComponent,
    ResetComponent,
    ResetPasswordComponent,
    ProfileAuthComponent,
    EditCovComponent,
    ButtonComponent,
    EditprofileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    OAuthModule.forRoot(),
    GoogleMapsModule,
    CommonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    LayoutModule,
    NgxGoogleAnalyticsModule.forRoot('G-P6VJHWJ1EL')




  ], exports: [
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


