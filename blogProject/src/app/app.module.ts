import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./api.service";
import {RouteModule} from "./route/route.module";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from "./auth.guard";
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import {BootstrapModalModule} from "ng2-bootstrap-modal";
import { DialogModalComponent } from './modals/dialog-modal/dialog-modal.component';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    ConfirmModalComponent,
    DialogModalComponent,
    HeaderComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouteModule,
    HttpClientModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  entryComponents: [
    DialogModalComponent,
    ConfirmModalComponent
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
