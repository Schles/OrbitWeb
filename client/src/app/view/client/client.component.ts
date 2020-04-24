import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {RendererComponent} from "../renderer/renderer.component";

import {Game} from "../../game/Game";
import {WebsocketService} from "../../network/websocket.service";

import {Event} from '../../network/client-enums';
import {Message} from "../../shared/message";

import {ActivatedRoute} from "@angular/router";
import {PlayerMessage} from "../../shared/player-message";

import {UiComponent} from "../ui/ui.component";



import {SpaceShooter} from "../../engine/SpaceShooter";
import {SkillUsedMessage} from "../../shared/skill-used-message";
import {Repair} from "../../game/skills/Repair";
import {SkillPrototypes} from "../../game/skills/SkillPrototypes";


import { log } from "../../../../../shared/lib"
import {IAction} from "../../../../../shared/src/action/IAction";
import {LobbyQueryMessage} from "../../../../../shared/src/message/login/LobbyQueryMessage";
import {SpaceshipFactory} from "../../game/SpaceshipFactory";
import {PlayerLoginMessage} from "../../../../../shared/src/message/login/PlayerLoginMessage";
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
import {CastSpell} from "../../util/CastSpell";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {ShipEquipmentGO} from "../../game/gameobjects/ShipEquipmentGO";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {

  public ownPlayer: SpaceshipGO;

  @ViewChild(UiComponent) private ui: UiComponent;
  @ViewChild('renderer') private renderer: RendererComponent;


  constructor(private gameService: GameService) {

  }

  public get app(): SpaceShooter {
    return this.renderer.pApp;
  }

  ngAfterViewInit(): void {
    this.gameService.connect();
  }


  ngOnInit() {

    window.addEventListener(
      "keydown", (event) => {
        if ( this.ownPlayer !== undefined) {
          if ( event.key === "1") {
            const msg = CastSpell.castSpell(this.ownPlayer, 0);
            if ( msg !== undefined) { this.gameService.send(msg); }
          } else if ( event.key === "2") {
            const msg = CastSpell.castSpell(this.ownPlayer, 1);
            if ( msg !== undefined) { this.gameService.send(msg); }
          } else if ( event.key === "3") {
            const msg = CastSpell.castSpell(this.ownPlayer, 2);
            if ( msg !== undefined) { this.gameService.send(msg); }
          } else if ( event.key === "4") {
            const msg = CastSpell.castSpell(this.ownPlayer, 3);
            if ( msg !== undefined) { this.gameService.send(msg); }
          } else if ( event.key === "5") {
            const msg = CastSpell.castSpell(this.ownPlayer, 4);
            if ( msg !== undefined) { this.gameService.send(msg); }
          }
        }
      });

    this.gameService.onConnect.subscribe( () => {

      this.ui.loginEnabled = true;

      this.gameService.send ( new LobbyQueryMessage());

    })

    this.gameService.onMessage.subscribe( (msg: Message) => {
      this.OnMessageReceived(msg);
    })

    Game.worldClicked.subscribe((event: { localPosition: Vector2, event: any }) => {
      console.log("worldClicked", event.localPosition);
      if (this.ownPlayer !== undefined) {

        const msg: PlayerMoveToMessage = new PlayerMoveToMessage(this.ownPlayer.id, event.localPosition);

        this.gameService.send(msg);

        this.ownPlayer.targetPosition = event.localPosition;
        this.ownPlayer.actionOrbitTarget = false;
      } else {
        console.log("no player");
      }
    });

    Game.playerClicked.subscribe((value) => {
      if (value.target.id === this.ownPlayer.id) {
        console.log("self");
      } else {

        const msg: PlayerOrbitMessage = new PlayerOrbitMessage(this.ownPlayer.id, value.target.id);

        this.gameService.send(msg);

        //this.ownPlayer.targetPlayer = value.target;
        //this.ownPlayer.actionOrbitTarget = true;
      }
    });


    let ticker = PIXI.Ticker.shared;

    console.log(ticker.FPS);

    ticker.add((delta) => {

      //  for( let i = 0; i < 5; i++) {
      //  const delta = 1;

      const dT = ticker.elapsedMS / 1000;

      if (this.ownPlayer !== undefined) {

/*
        const v = CMath.length(this.ownPlayer.speed);
        this.ui.speedUI = v.toFixed(0);
        this.ui.cooldownUI = this.ownPlayer.cannon.remainingCooldown.toFixed(0)
        this.ui.speedInputUI = this.ownPlayer.speedInput.toFixed(1);
        if (this.ownPlayer.targetPlayer !== undefined) {
          const dist: number = CMath.length(CMath.sub(this.ownPlayer.position, this.ownPlayer.targetPlayer.position));
          this.ui.distanceUI = dist.toFixed(0);
          this.ui.orbitUI = this.ownPlayer.orbitRadius;
        } else {
          this.ui.distanceUI = undefined;
        }

 */
      }
    });
  }





  public OnMessageReceived(message: Message) {
//console.log(message);
    switch (message.type) {


      case "dmgMessage":
        //const player = this.renderer.pApp.players.find(value => value.id === message.target);
        //player.health -= message.damage;
        break;


      case "playerJoinedMessage":
        this.OnPlayerJoinedMessage(<PlayerJoinedMessage> message);
        break;

      case "playerUpdateMessage":
        this.moveEnemy(<PlayerUpdateMessage> message);
        break;

      case "playerKilledMessage":
        this.OnKillingBlowMessage(<PlayerKilledMessage> message);
        break;

      case "playerTargetSkillUsedMessage":
        let p = this.getEnemy((<PlayerTargetSkillUsedMessage> message).source);
        let t = this.getEnemy((<PlayerTargetSkillUsedMessage> message).target);

        const skillGO = SkillPrototypes.OnTargetSkillUsedMessage((<PlayerTargetSkillUsedMessage> message).skillId, p, t);
        this.renderer.pApp.spawnSkill(skillGO);
        break;

      case "projectileSpawnMessage":
        this.onProjSpawn(<ProjectileSpawnMessage> message);
        break;

      case "projectileUpdateMessage":
        this.onProjUpdate(<ProjectileUpdateMessage> message);
        break;

      case "projectileDestroyMessage":
        this.onProjDestroy(<ProjectileDestroyMessage> message);
        break;

      default:
        console.log("unknown message", message);
        break;
    }
  }

  public OnPlayerJoinedMessage(message: PlayerJoinedMessage) {
    console.log(message);
    let enemyGO: SpaceshipGO = this.getEnemy(message.source);

    if (enemyGO === undefined) {

      const enemy: Spaceship = Factories.createSpaceship(message);

      enemyGO =  new SpaceshipGO(enemy);
      /*
          enemy.position.x = msg.x;
          enemy.position.y = msg.y;

          enemy.health = msg.health;
          enemy.rotation = msg.rotation;

          enemy.speed.x = msg.speedX;
          enemy.speed.y = msg.speedY;

          enemy.cannon.rotation = msg.gun_rotation;
      */
      enemyGO.fitting = new ShipFitting();
      enemyGO.fitting.fitting = message.fitting.fitting.map ( (fit) => {
        return new ShipEquipmentGO(fit);
      });
      this.renderer.pApp.spawnPlayer(enemyGO);

      enemyGO.iterateGraphics();
    } else {
      //console.log("Bereits bekannt");
    }

    if ( message.source === this.gameService.getUserName()) {
      this.ownPlayer = enemyGO;
      this.ui.loginEnabled = false;
    }
  }

  public OnKillingBlowMessage(message: PlayerKilledMessage) {
    console.error("kill", message);

    const deadPlayer = this.renderer.pApp.players.find(value => value.id === message.source);

    //this.ui.addKill(message.origin);

    if ( deadPlayer !== undefined) {

      this.renderer.pApp.killPlayer(deadPlayer);

      if (this.ownPlayer !== undefined && this.ownPlayer.id === deadPlayer.id) {

          console.error("ich bin gestorben");

          this.ownPlayer = undefined;
          this.ui.loginEnabled = true;
      }

    }

  }

  public getEnemy(name: string): SpaceshipGO {
    return this.renderer.pApp.players.find(value => {
      return value.id === name;
    });
  }

  public moveEnemy(msg: PlayerUpdateMessage) {
    const enemyGO = this.getEnemy(msg.source);

    if (enemyGO === undefined)
      return;


    enemyGO.position.x = msg.x;
    enemyGO.position.y = msg.y;

    enemyGO.speed.x = msg.speedX;
    enemyGO.speed.y = msg.speedY;

    enemyGO.rotation = msg.rotation;
    enemyGO.cannon.rotation = msg.gun_rotation;

    enemyGO.health = msg.health;

    if ( msg.target !== undefined ) {
      const target = this.renderer.pApp.players.find((p) => p.id === msg.target);

      if (target !== undefined) {
        enemyGO.targetPlayer = target;
      }
    } else {
      enemyGO.targetPlayer = undefined;
    }

    enemyGO.iterateGraphics();
  }

  // Projectile

  public onProjSpawn(msg: ProjectileSpawnMessage) {

    const source = this.renderer.pApp.players.find( (p) => p.id === msg.source);
    const target = this.renderer.pApp.players.find( (p) => p.id === msg.target);

    console.log(msg);

    if ( source !== undefined && target !== undefined) {
      const projectileGO: ProjectileGO = new ProjectileGO(msg.id, source, target);
      this.renderer.pApp.spawnProjectile(projectileGO);
    }

  }

  public onProjUpdate(msg: ProjectileUpdateMessage) {
    //console.log(msg);
  }

  public onProjDestroy(msg: ProjectileDestroyMessage) {

    const projectile = this.renderer.pApp.projectiles.find ( (p) => p.id === msg.id);

    if (projectile !== undefined) {
      this.renderer.pApp.destroyProjectile(projectile);
    }
  }

}
