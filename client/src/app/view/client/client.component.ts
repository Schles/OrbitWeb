import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {RendererComponent} from "../renderer/renderer.component";

import {Game} from "../../game/Game";
import {UiComponent} from "../ui/ui.component";



import {SpaceShooter} from "../../engine/SpaceShooter";


import {SkillPrototypes} from "../../game/skills/SkillPrototypes";

import {LobbyQueryMessage} from "../../../../../shared/src/message/login/LobbyQueryMessage";
import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {SpaceshipGO} from "../../game/gameobjects/SpaceshipGO";
import {Factories} from "../../../../../shared/src/util/Factories";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {PlayerUpdateMessage} from "../../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {PlayerMoveToMessage} from "../../../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {Vector2} from "../../../../../shared/src/util/VectorInterface";
import {PlayerOrbitMessage} from "../../../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {PlayerActionMessage} from "../../../../../shared/src/message/game/player/PlayerActionMessage";
import {PlayerTargetSkillUsedMessage} from "../../../../../shared/src/message/game/player/PlayerSkillUsedMessage";
import {PlayerKilledMessage} from "../../../../../shared/src/message/game/player/PlayerKilledMessage";
import {ProjectileSpawnMessage} from "../../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ProjectileUpdateMessage} from "../../../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {ProjectileDestroyMessage} from "../../../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {ProjectileGO} from "../../game/gameobjects/ProjectileGO";
import {GameService} from "../../service/game.service";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {ShipEquipmentGO} from "../../game/gameobjects/ShipEquipmentGO";
import {FactoryEquipmentGO} from "../../game/equipment/FactoryEquipmentGO";
import {Rocket} from "../../game/projectiles/Rocket";
import {Message} from "../../../../../shared/src/message/Message";
import {ScoreboardUpdateMessage} from "../../../../../shared/src/message/game/ScoreboardUpdateMessage";
import {MessageFactory} from "../../network/messages/MessageFactory";
import {PlayerService} from "../../service/player.service";
import {Camera} from "../../engine/Camera";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {

  @ViewChild(UiComponent, {static: true}) private ui: UiComponent;
  @ViewChild('renderer', {static: true}) private renderer: RendererComponent;

  private camera: Camera;

  constructor(private gameService: GameService, private playerService: PlayerService) {

    this.camera = new Camera(this.gameService.app().gameStage, this.gameService, this.playerService);
    //this.camera.setSize(this.width, this.height);
  }

  public get app(): SpaceShooter {
    return this.renderer.pApp;
  }

  ngAfterViewInit(): void {
    this.gameService.connect();
  }

  ngOnInit() {
    this.gameService.onConnect.subscribe( () => {
      this.ui.loginEnabled = true;
      this.gameService.send ( new LobbyQueryMessage());
    });
  }

}
