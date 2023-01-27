import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from "./about/about.component";
import { DisplaycovComponent } from "./displaycov/displaycov.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddcovComponent } from "./addcov/addcov.component";
import { NavComponent } from './nav/nav.component';
import {LoginRegisterComponent} from "./auth/login-register/login-register.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {ResetComponent} from "./auth/reset/reset.component";
import {LoginGuard} from "./login.guard";
import {ProfileAuthComponent} from "./auth/profile-auth/profile-auth.component";
import {EditCovComponent} from "./edit-cov/edit-cov.component";
import {ButtonComponent} from "./button/button.component";

const routes: Routes = [
  {path: '', redirectTo: 'login-register', pathMatch: 'full'},
  { path: 'home', component:HomeComponent},
  { path: 'displayCov/:from/:to/:date', component:DisplaycovComponent },
  { path: 'addcov', component:AddcovComponent },
  { path: 'about', component:AboutComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'login-register', component:LoginRegisterComponent },
  {path:'reset' ,component:ResetPasswordComponent },
  {path:'resetPassword' ,component:ResetComponent },
  {path:'prof' ,component:ProfileAuthComponent },
  { path: 'editcov/:id', component: EditCovComponent },
  { path: 'button', component: ButtonComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
