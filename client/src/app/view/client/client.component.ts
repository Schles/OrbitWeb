import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Spaceship} from "../../game/Spaceship";
import {RendererComponent} from "../renderer/renderer.component";
import {Physics} from "../../game/Physics";
import {Game} from "../../game/Game";
import {ClientService} from "../../network/client.service";
import {WebsocketService} from "../../network/websocket.service";

import {Event} from '../../network/client-enums';
import {Message} from "../../shared/message";

import {ActivatedRoute} from "@angular/router";
import {PlayerMessage} from "../../shared/player-message";
import {AuthMessage} from "../../shared/auth-message";
import {Player} from "../../../../../server/src/model/player";
import {CMath, Vector2} from "../../game/CMath";
import {LaserMessage} from "../../shared/laser-message";
import {Projectile} from "../../game/Projectile";
import {DamageMessage} from "../../shared/damage-message";
import {KillingBlowMessage} from "../../shared/killing-blow-message";
import {UiComponent} from "../ui/ui.component";
import {LobbyQueryMessage} from "../../shared/lobby-query-message";
import {PlayerJoinedMessage} from "../../shared/player-joined-message";



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {


  //private userName: string;
  public ownPlayer: Spaceship;

  private ioConnection: any;

  @ViewChild(UiComponent) private ui: UiComponent;
  @ViewChild('renderer') private renderer: RendererComponent;




  constructor(private socketService: WebsocketService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    //this.userName = this.route.snapshot.paramMap.get("name")

    this.ui.spawnPlayer.subscribe( (value: Spaceship) => {
      this.ownPlayer = value;

      const x = this.renderer.width * 0.1 + Math.floor(Math.random() * Math.floor(this.renderer.width * 0.8));
      const y = this.renderer.height * 0.1 + Math.floor(Math.random() * Math.floor(this.renderer.height * 0.8));
      const rotation = Math.floor(Math.random() * 360) * Math.PI / 180;
      const gun_rotation = 90 * Math.PI / 180;

      this.ownPlayer.position.x = x;
      this.ownPlayer.position.y = y;

      this.ownPlayer.rotation = rotation;
      this.ownPlayer.cannon.rotation = gun_rotation

      this.renderer.pApp.spawnPlayer(this.ownPlayer);

      this.ownPlayer.iterateGraphics();

      const msg: PlayerJoinedMessage = this.getPlayerJoinedMessage();
      msg.x = x;
      msg.y = y;
      msg.rotation = rotation;
      msg.gun_rotation = gun_rotation;
      msg.health = value.health;
      msg.color = value.color

      this.socketService.send(msg);

      this.ui.loginEnabled = false;
    });

    Game.worldClicked.subscribe((event) => {
      if (this.ownPlayer !== undefined) {
        this.ownPlayer.targetPosition = {
          x: event.data.global.x,
          y: event.data.global.y
        };
        this.ownPlayer.actionOrbitTarget = false;
      } else {
        console.log("no player");

      }


    });


    Game.playerClicked.subscribe((value) => {
      console.log(value.target);
      console.log(this.ownPlayer);
      if (value.target.id === this.ownPlayer.id) {
        console.log("self");
      } else {
        this.ownPlayer.targetPlayer = value.target;
        this.ownPlayer.actionOrbitTarget = true;
      }

    });


    Game.renderLaser.subscribe((laser: { start: Vector2, end: Vector2 }) => {
      this.socketService.send(new LaserMessage(this.ownPlayer.color, laser.start.x, laser.start.y, laser.end.x, laser.end.y));
    });

    Game.playerHit.subscribe((value: { target: Spaceship, damage: number }) => {
      this.onPlayerHit(value);
    });


    const physics: Physics = new Physics();
    let ticker = PIXI.Ticker.shared;

    console.log(ticker.FPS);
    console.log("dMS", ticker.elapsedMS);

    ticker.add((delta) => {

      //  for( let i = 0; i < 5; i++) {
      //  const delta = 1;

      const dT = ticker.elapsedMS / 1000;

      if (this.ownPlayer !== undefined) {
        this.ownPlayer.iterate(dT);

        physics.iterate(this.ownPlayer, dT);

        const msg: PlayerMessage = this.getPlayerMessage();

        this.socketService.send(msg);

        const v = CMath.length(this.ownPlayer.speed);

        this.ui.speedUI = v.toFixed(0);
        this.ui.cooldownUI = this.ownPlayer.cannon.remainingCooldown.toFixed(0)

        if (this.ownPlayer.targetPlayer !== undefined) {
          const dist: number = CMath.length(CMath.sub(this.ownPlayer.position, this.ownPlayer.targetPlayer.position));
          this.ui.distanceUI = dist.toFixed(0);
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

                const msg: PlayerJoinedMessage = this.getPlayerJoinedMessage();
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
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');

        this.ui.loginEnabled = true;

        this.socketService.send ( new LobbyQueryMessage());

      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public OnPlayerJoinedMessage(message: PlayerJoinedMessage) {
    const enemyGO = this.getEnemy(message.name);
    if (enemyGO === undefined) {
      this.initEnemy(message);
    } else {
      console.log("Bereits bekannt");
    }
  }

  public OnKillingBlowMessage(message: KillingBlowMessage) {
    console.error("kill", message);
    const deadPlayer = this.renderer.pApp.players.find(value => value.id === message.target);

    this.ui.addKill(message.origin);

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

  public OnAuthMessage(message: AuthMessage) {
    if (this.ownPlayer === undefined || (message.name === this.ownPlayer.id && this.getEnemy(this.ownPlayer.id) === undefined)) {
      //this.initOwnPlayer(message);
    } else {
      const enemyGO = this.getEnemy(message.name);
      if (enemyGO === undefined) {
        this.initEnemy(message);

        const msg: AuthMessage = <AuthMessage>this.getPlayerMessage();
        msg.type = "authMessage";
        this.socketService.send(msg);
      } else {
        console.log("Bereits bekannt");
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

    enemyGO.rotation = msg.rotation;
    enemyGO.cannon.rotation = msg.gun_rotation;

    enemyGO.iterateGraphics();
  }

  public initProjectile(msg: LaserMessage) {
    const projectile: Projectile = new Projectile(msg.color);

    projectile.drawLine({
      x: msg.startX,
      y: msg.startY
    }, {
      x: msg.endX,
      y: msg.endY
    });

    this.renderer.pApp.spawnProjectile(projectile);
  }

  public initEnemy(msg: PlayerJoinedMessage) {
    const enemy: Spaceship = new Spaceship(msg.name, msg.color);

    enemy.position.x = msg.x;
    enemy.position.y = msg.y;

    enemy.health = msg.health;
    enemy.rotation = msg.rotation;

    enemy.cannon.rotation = msg.gun_rotation;

    this.renderer.pApp.spawnPlayer(enemy);

    enemy.iterateGraphics();

  }

  ngAfterViewInit(): void {

    this.initIoConnection();

    this.ui.spawnPlayer.subscribe( (value) => {
      //console.log(value);
    })

  }


  private getPlayerMessage(): PlayerMessage {
    return new PlayerMessage(this.ownPlayer.id, this.ownPlayer.position.x, this.ownPlayer.position.y, this.ownPlayer.rotation, this.ownPlayer.cannon.rotation);
  }

  private getPlayerJoinedMessage(): PlayerJoinedMessage {
    return new PlayerJoinedMessage(this.ownPlayer.id, this.ownPlayer.position.x, this.ownPlayer.position.y, this.ownPlayer.rotation, this.ownPlayer.cannon.rotation, this.ownPlayer.health, this.ownPlayer.color);
  }

}
