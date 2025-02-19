import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './view/ui/ui.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FittingComponent } from './view/ui/fitting/fitting.component';
import { HeadsupComponent } from './view/ui/headsup/headsup.component';

import { ProgressBarComponent } from './view/util/progress-bar/progress-bar.component';
import { ScoreboardComponent } from './view/ui/scoreboard/scoreboard.component';
import { GameComponent } from './game/game.component';
import { EquipmentSlotComponent } from './view/ui/fitting/equipment-slot/equipment-slot.component';
import { NameplateComponent } from './view/ui/nameplate/nameplate.component';
import { TooltipComponent } from './view/ui/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    FittingComponent,
    HeadsupComponent,
    ProgressBarComponent,
    ScoreboardComponent,
    GameComponent,
    NameplateComponent,
    TooltipComponent,
    EquipmentSlotComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
