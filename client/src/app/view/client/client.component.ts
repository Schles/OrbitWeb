import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Spaceship} from "../../game/Spaceship";
import {RendererComponent} from "../renderer/renderer.component";
import {Physics} from "../../game/Physics";
import {Game} from "../../game/Game";
import {WebsocketService} from "../../network/websocket.service";

import {Event} from '../../network/client-enums';
import {Message} from "../../shared/message";

import {ActivatedRoute} from "@angular/router";
import {PlayerMessage} from "../../shared/player-message";

import {CMath, Vector2} from "../../game/CMath";
import {LaserMessage} from "../../shared/laser-message";

import {DamageMessage} from "../../shared/damage-message";
import {KillingBlowMessage} from "../../shared/killing-blow-message";
import {UiComponent} from "../ui/ui.component";
import {LobbyQueryMessage} from "../../shared/lobby-query-message";
import {PlayerJoinedMessage} from "../../shared/player-joined-message";
import {Projectile} from "../../game/weapons/Projectile";
import {Laser} from "../../game/weapons/Laser";
import {SpaceShooter} from "../../engine/SpaceShooter";



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {


  public DEBUG: boolean = true;

  //private userName: string;
  public ownPlayer: Spaceship;

  private ioConnection: any;

  @ViewChild(UiComponent) private ui: UiComponent;
  @ViewChild('renderer') private renderer: RendererComponent;


  constructor(private socketService: WebsocketService, private route: ActivatedRoute) {

  }

  public get app(): SpaceShooter {
    return this.renderer.pApp;
  }

  ngAfterViewInit(): void {
    this.initIoConnection();


  }


  public test() {

  }

  ngOnInit() {
    this.ui.spawnPlayer.subscribe( (value: Spaceship) => {
      this.ownPlayer = value;
      this.renderer.pApp.spawnPlayer(this.ownPlayer);

      this.ownPlayer.iterateGraphics();

      const msg: PlayerJoinedMessage = this.ownPlayer.getPlayerJoinedMessage();
      this.socketService.send(msg);

      this.ui.loginEnabled = false;
    });

    Game.worldClicked.subscribe((event: { localPosition: Vector2, event: any }) => {
      console.log("worldClicked", event.localPosition);
      if (this.ownPlayer !== undefined) {
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
        this.ownPlayer.targetPlayer = value.target;
        this.ownPlayer.actionOrbitTarget = true;
      }

    });


    Game.shootLaser.subscribe((laser: { start: Spaceship, end: Spaceship }) => {
      this.socketService.send(new LaserMessage(this.ownPlayer.color, laser.start.id, laser.end.id));
    });

    Game.playerHit.subscribe((value: { target: Spaceship, damage: number }) => {
      this.onPlayerHit(value);
    });


    const physics: Physics = new Physics();
    let ticker = PIXI.Ticker.shared;

    console.log(ticker.FPS);

    ticker.add((delta) => {

      //  for( let i = 0; i < 5; i++) {
      //  const delta = 1;

      const dT = ticker.elapsedMS / 1000;

      if (this.ownPlayer !== undefined) {
        this.ownPlayer.iterate(dT);

        Physics.iterate(this.ownPlayer, dT);

        const msg: PlayerMessage = this.ownPlayer.getPlayerMessage();

        this.socketService.send(msg);

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
      }

      this.renderer.pApp.players.forEach(value => {
        value.iterateGraphics();
      });
    });
  }




  public onPlayerHit(value: { target: Spaceship, damage: number }) {
    let health = value.target.health;
    health -= value.damage;
    if (health <= 0) {
      this.socketService.send(new KillingBlowMessage(this.ownPlayer.id, value.target.id, value.damage));
    } else {
      this.socketService.send(new DamageMessage(this.ownPlayer.id, value.target.id, value.damage));
    }
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.OnMessageReceived(message)
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');

        this.ui.loginEnabled = true;

        this.socketService.send ( new LobbyQueryMessage());

        if (this.DEBUG) {
          this.ui.spawnTypeWithName("default", "Schles");

          const msg = new PlayerJoinedMessage("Enemy", 700, 340, 0, 100, 0, 0, 100, "#FFaaFF", 10);
          this.socketService.send(msg);
        }

      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public OnMessageReceived(message: Message) {

    switch (message.type) {
      /*
      case "authMessage":
        this.OnAuthMessage(message);
        console.log(message);
        break;
       */

      case "playerMessage":
        if (this.ownPlayer === undefined || message.name !== this.ownPlayer.id)
          this.moveEnemy(message);
        break;

      case "laserMessage":
        this.initProjectile(message);
        break;

      case "dmgMessage":
        const player = this.renderer.pApp.players.find(value => value.id === message.target);
        player.health -= message.damage;
        break;


      case "killingBlowMessage":
        this.OnKillingBlowMessage(message);
        break;

      case "lobbyQueryMessage":
        if (this.ownPlayer !== undefined) {

          const msg: PlayerJoinedMessage = this.ownPlayer.getPlayerJoinedMessage();
          this.socketService.send(msg);
        }
        break;

      case "playerJoinedMessage":
        this.OnPlayerJoinedMessage(message);
        break;

      default:
        console.log("unknown message", message);
        break;
    }
  }

  public OnPlayerJoinedMessage(message: PlayerJoinedMessage) {
    const enemyGO = this.getEnemy(message.name);
    if (enemyGO === undefined) {
      this.initEnemy(message);
    } else {
      //console.log("Bereits bekannt");
    }
  }

  public OnKillingBlowMessage(message: KillingBlowMessage) {
    console.error("kill", message);
    const deadPlayer = this.renderer.pApp.players.find(value => value.id === message.target);

    this.ui.addKill(message.origin);

    if ( deadPlayer !== undefined) {
      if (this.ownPlayer !== undefined) {
        if (this.ownPlayer.id === deadPlayer.id) {
          console.error("ich bin gestorben");
          this.renderer.pApp.killPlayer(deadPlayer);
          this.ownPlayer = undefined;
          this.ui.loginEnabled = true;
        } else {
          this.renderer.pApp.killPlayer(deadPlayer);

          if (this.ownPlayer.targetPlayer.id === deadPlayer.id) {
            this.ownPlayer.removeTarget();
          }
        }

      } else {
        this.renderer.pApp.killPlayer(deadPlayer);
      }
    }
  }

  public getEnemy(name: string): Spaceship {
    return this.renderer.pApp.players.find(value => {
      return value.id === name;
    });
  }

  public moveEnemy(msg: PlayerMessage) {
    const enemyGO = this.getEnemy(msg.name)

    if (enemyGO === undefined)
      return;


    enemyGO.position.x = msg.x;
    enemyGO.position.y = msg.y;

    enemyGO.speed.x = msg.speedX;
    enemyGO.speed.y = msg.speedY;

    enemyGO.rotation = msg.rotation;
    enemyGO.cannon.rotation = msg.gun_rotation;

    enemyGO.iterateGraphics();
  }

  public initProjectile(msg: LaserMessage) {

    const sourcePlayer: Spaceship = this.renderer.pApp.players.find( value => value.id === msg.origin);
    const targetPlayer: Spaceship = this.renderer.pApp.players.find( value => value.id === msg.target);

    if ( sourcePlayer === undefined && targetPlayer === undefined)
      return;


    const projectile: Laser = new Laser(msg.color);
    projectile.source = sourcePlayer;
    projectile.target = targetPlayer;

/*
    projectile.drawLine({
      x: msg.startX,
      y: msg.startY
    }, {
      x: msg.endX,
      y: msg.endY
    });
    */

    this.renderer.pApp.spawnProjectile(projectile);
  }

  public initEnemy(msg: PlayerJoinedMessage) {
    const enemy: Spaceship = new Spaceship(msg.name, msg.color);

    enemy.position.x = msg.x;
    enemy.position.y = msg.y;

    enemy.health = msg.health;
    enemy.rotation = msg.rotation;

    enemy.speed.x = msg.speedX;
    enemy.speed.y = msg.speedY;

    enemy.cannon.rotation = msg.gun_rotation;

    this.renderer.pApp.spawnPlayer(enemy);

    enemy.iterateGraphics();

  }



}
