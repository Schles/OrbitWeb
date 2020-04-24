import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RendererComponent } from './view/renderer/renderer.component';
import { ClientComponent } from './view/client/client.component';
import { UiComponent } from './view/ui/ui.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FittingComponent } from './view/ui/fitting/fitting.component';
import { HeadsupComponent } from './view/ui/headsup/headsup.component';



@NgModule({
  declarations: [
    AppComponent,
    RendererComponent,
    ClientComponent,
    UiComponent,
    FittingComponent,
    HeadsupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
