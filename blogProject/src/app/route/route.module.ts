import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "../registration/registration.component";
import {LoginComponent} from "../login/login.component";
import {ProfileComponent} from "../profile/profile.component";
import {AuthGuard} from "../auth.guard";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {ProfileDataComponent} from "../profile-data/profile-data.component";
const appRoutes: Routes = [
  {path: 'form', component: RegistrationComponent},
  {path: '', redirectTo: '/form', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'profileData', component: ProfileDataComponent, canActivate:[AuthGuard]
  }];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RouteModule { }
