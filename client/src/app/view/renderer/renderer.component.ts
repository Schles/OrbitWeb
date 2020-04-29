import {Component, EventEmitter, HostListener, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {CMath} from "../../util/CMath";
import * as math from 'mathjs';
import {Game} from "../../game/Game";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {Camera} from "../../engine/Camera";
import {GameService} from "../../service/game.service";
import {Vector2} from "../../../../../shared/src/util/VectorInterface";


@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit {

  @ViewChild('pixiContainer', {static: true}) pixiContainer;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private ngZone: NgZone, private gameService: GameService) {
    console.log(this.gameService);
  }

  public get pApp(): SpaceShooter { // this will be our pixi application
    return this.gameService.app();
  }

  private xOffset = 0;
  private yOffset = 0;

  ngOnInit() {
    this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document
    this.pApp.renderer.plugins.interaction.on('pointerup', (event) => this.canvasClicked(event));
  }

  private canvasClicked(event) {
    const v = this.pApp.gameStage.toLocal(event.data.global);
    const localPosition: Vector2 = {
      x: v.x,
      y: v.y
    };

    const clickedPlayer = this.pApp.players.find( (ship) =>
      CMath.isInsideCircle(ship.position, localPosition, 50));

    if (clickedPlayer !== undefined) {
      Game.playerClicked.emit( {
        target: clickedPlayer,
        localPosition: localPosition,
        event: event,
      });
    } else {
      Game.worldClicked.emit( {
        localPosition: localPosition,
        event: event
      });

    }
  }

  @HostListener('window:resize')
  public resize() {
    this.pApp.renderer.resize(window.innerWidth - this.xOffset , window.innerHeight - this.yOffset);
    this.pApp.OnResizeWindow.emit({x: this.pApp.renderer.width, y: this.pApp.renderer.height});
  }

  public get width(): number {
    return  this.pixiContainer.nativeElement.offsetWidth;
  }

  public get height(): number {
    return  this.pixiContainer.nativeElement.offsetHeight;
  }



  destroy() {
//    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
