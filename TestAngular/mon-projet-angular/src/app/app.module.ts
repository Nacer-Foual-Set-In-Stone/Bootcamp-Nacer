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
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';

//CàD que l'orsque on qppel le path appareils (localhost/appareils) on appelle le component AppareilView
const appRoutes: Routes = [
  {path: "appareils" ,canActivate: [AuthGuard], component: AppareilViewComponent},
  {path: "appareils/:id",canActivate: [AuthGuard], component: SingleAppareilComponent}, // <-- l'ajout de canActivate fait réferance à notre service auth-guard
  {path: "auth", component: AuthComponent},
  {path: "", component: AppareilViewComponent}, // <-- Correspond à path vide càd home
  {path: "not-found", component: FourOhFourComponent},
  {path: "**", redirectTo: "/not-found"} //<-- path wildcard TOUJOURS mettre à la FIN
];

//directive
@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)  //<---- C'est de cette manière qu'on call les routes
  ],
  providers: [ //<--- Ne pas oblié de rajouter les services
    AppareilService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
