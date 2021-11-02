import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';

import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.services';

//CàD que l'orsque on qppel le path appareils (localhost/appareils) on appelle le component AppareilView
const appRoutes: Routes = [
  {path: "appareils" , component: AppareilViewComponent},
  {path: "auth", component: AuthComponent},
  {path: "", component: AppareilViewComponent} // <-- Correspond à path vide càd home
];

//directive
@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)  //<---- C'est de cette manière qu'on call les routes
  ],
  providers: [
    AppareilService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
