import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GameService } from '../service/game.service';
import { PlayerService } from '../service/player.service';
import { UiComponent } from '../view/ui/ui.component';
import { InputService } from '../service/input.service';
import { NetworkService } from '../service/network.service';
import { AssetManager, ShipFitting } from '@orbitweb/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('pixiContainer', { static: true }) pixiContainer;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(UiComponent, { static: true }) private ui: UiComponent;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private networkService: NetworkService,
    private inputService: InputService
  ) {}

  ngOnInit() {
    this.pixiContainer.nativeElement.appendChild(this.gameService.app().renderer.view); // this places our pixi application onto the viewable document
  }

  @HostListener('window:resize')
  public resize() {
    this.gameService.app().renderer.OnResizeWindow.emit({
      x: this.gameService.app().renderer.renderer.width,
      y: this.gameService.app().renderer.renderer.height,
    });
  }

  public ngAfterViewInit(): void {
    this.gameService.app().onViewReady();

    this.gameService.app().networkManager.onConnect.subscribe(() => {
      this.ui.loginEnabled = true;
    });

    this.networkService.connect();
  }
}
