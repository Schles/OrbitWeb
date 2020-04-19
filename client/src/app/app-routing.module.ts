import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RendererComponent} from "./view/renderer/renderer.component";
import {ClientComponent} from "./view/client/client.component";


const routes: Routes = [
  { path: 'game', component: ClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
