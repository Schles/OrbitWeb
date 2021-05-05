import {AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from "../service/game.service";
import {PlayerService} from "../service/player.service";
import {UiComponent} from "../view/ui/ui.component";
import {Camera} from "@orbitweb/renderer";
import {Vector2} from "@orbitweb/common";
import {CMath} from "@orbitweb/common";
import {Events} from "@orbitweb/renderer";
import {LobbyQueryMessage} from "@orbitweb/common";

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
              private inputService: InputService) {

  }

  ngOnInit() {
    this.pixiContainer.nativeElement.appendChild(this.gameService.app().view); // this places our pixi application onto the viewable document
  }

  
  @HostListener('window:resize')
  public resize() {
    console.log("resize");    
    this.gameService.app().OnResizeWindow.emit({x: this.gameService.app().renderer.width, y: this.gameService.app().renderer.height});
  }

  public ngAfterViewInit(): void {
    this.gameService.app().onViewReady();

    this.gameService.app().networkManager.onConnect.subscribe( () => {
      this.ui.loginEnabled = true;
    });

    this.networkService.connect();
  }

}
