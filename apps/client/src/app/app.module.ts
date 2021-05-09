import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './view/ui/ui.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FittingComponent } from './view/ui/fitting/fitting.component';
import { HeadsupComponent } from './view/ui/headsup/headsup.component';

import { ProgressBarComponent } from './view/util/progress-bar/progress-bar.component';
import { EquipmentWindowComponent } from './view/ui/fitting/equipment-window/equipment-window.component';
import { ScoreboardComponent } from './view/ui/scoreboard/scoreboard.component';
import { GameComponent } from './game/game.component';
import { EquipmentSlotComponent } from './view/ui/fitting/equipment-slot/equipment-slot.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    FittingComponent,
    HeadsupComponent,
    ProgressBarComponent,
    EquipmentWindowComponent,
    ScoreboardComponent,
    GameComponent,
    EquipmentSlotComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
