import {AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from "../service/game.service";
import {PlayerService} from "../service/player.service";
import {UiComponent} from "../view/ui/ui.component";
import {Camera} from "@orbitweb/renderer";
import {Vector2} from "@orbitweb/common";
import {CMath} from "@orbitweb/common";
import {Events} from "@orbitweb/renderer";
import {LobbyQueryMessage} from "@orbitweb/common";

import { CameraService } from '../service/camera.service';
import { InputService } from '../service/input.service';
import { NetworkService } from '../service/network.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit{

  @ViewChild('pixiContainer', {static: true}) pixiContainer;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(UiComponent, {static: true}) private ui: UiComponent;

  private camera: Camera;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private networkService: NetworkService,
              private cameraService: CameraService,
              private inputService: InputService) {

  }

  ngOnInit() {
    this.pixiContainer.nativeElement.appendChild(this.gameService.app().view); // this places our pixi application onto the viewable document

    this.gameService.app().renderer.plugins.interaction.on('pointerup', (event) => this.canvasClicked(event));

    
  }

  private canvasClicked(event) {
    const v = this.gameService.app().gameStage.toLocal(event.data.global);
    const localPosition: Vector2 = {
      x: v.x,
      y: v.y
    };

    const clickedPlayer = this.gameService.app().players.find( (ship) =>
      CMath.isInsideCircle(ship.position, localPosition, 50));

    const clickedStructure = this.gameService.app().structures.find( (structure) =>
      CMath.isInsideCircle(structure.position, localPosition, 50));

    if (clickedPlayer !== undefined) {
      Events.playerClicked.emit({
        target: clickedPlayer,
        localPosition: localPosition,
        event: event,
      });
    } else if (clickedStructure !== undefined) {
        Events.structureClicked.emit( {
          target: clickedStructure,
          event: event,
        });
    } else {
      Events.worldClicked.emit( {
        localPosition: localPosition,
        event: event
      });

    }
  }

  @HostListener('window:resize')
  public resize() {
    console.log("resize");
    this.gameService.app().renderer.resize(window.innerWidth, window.innerHeight);
    this.gameService.app().OnResizeWindow.emit({x: this.gameService.app().renderer.width, y: this.gameService.app().renderer.height});
  }

  public ngAfterViewInit(): void {
    this.networkService.onConnect.subscribe( () => {
      this.ui.loginEnabled = true;


      this.gameService.clear();
      this.networkService.send ( new LobbyQueryMessage());

    });

    this.camera = new Camera(this.gameService.app().gameStage);
    this.gameService.app().camera = this.camera;
    this.networkService.connect();
    this.cameraService.init();
  }

}
