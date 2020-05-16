import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './components/events/events.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { CreateUserCardComponent } from './components/create-user-card/create-user-card.component';
import { AuthGuard } from './authguard';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    ProfileComponent,
    SettingsComponent,
    MyEventsComponent,
    LoginComponent,
    HeaderComponent,
    LoginCardComponent,
    CreateUserCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
