import {AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from "../../service/game.service";
import {PlayerService} from "../../service/player.service";
import {UiComponent} from "../ui/ui.component";
import {Camera} from "../../engine/Camera";
import {Vector2} from "../../../../../shared/src/util/VectorInterface";
import {CMath} from "../../util/CMath";
import {Game} from "../../game/Game";
import {LobbyQueryMessage} from "../../../../../shared/src/message/login/LobbyQueryMessage";
import {ClientService} from "../../service/client.service";

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
              private clientService: ClientService) {

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
      Game.playerClicked.emit({
        target: clickedPlayer,
        localPosition: localPosition,
        event: event,
      });
    } else if (clickedStructure !== undefined) {
        Game.structureClicked.emit( {
          target: clickedStructure,
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
    console.log("resize");
    this.gameService.app().renderer.resize(window.innerWidth, window.innerHeight);
    this.gameService.app().OnResizeWindow.emit({x: this.gameService.app().renderer.width, y: this.gameService.app().renderer.height});
  }

  public ngAfterViewInit(): void {
    this.gameService.onConnect.subscribe( () => {
      this.ui.loginEnabled = true;


      this.gameService.clear();
      this.gameService.send ( new LobbyQueryMessage());

    });

    this.camera = new Camera(this.gameService.app().gameStage, this.gameService, this.playerService);
    this.gameService.app().depCamera = this.camera;
    this.gameService.connect();
  }

}
