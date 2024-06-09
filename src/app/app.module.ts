import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { CreateActivityComponent } from './createActivity/createActivity.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateAnimationComponent } from './createAnimation/createAnimation.component';
import { RegisterComponent } from './register/register.component';
import { ViewActivityDetailsComponent } from './view-activity-details/view-activity-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [							
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
      CreateActivityComponent,
      CreateAnimationComponent,
      RegisterComponent,
      ViewActivityDetailsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
