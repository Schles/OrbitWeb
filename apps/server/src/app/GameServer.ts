import { Message } from '@orbitweb/common';
import { GameLogic } from '@orbitweb/game-logic';

const gameloop = require('node-gameloop');

export class GameServer extends GameLogic {
  public activeConnectionCount: number = 0;

  private gameLoopId: number;

  private tickRate: number = 1000 / 60;

  public onSend: (msg) => void;

  constructor() {
    super();

    this.boundries.x1 = { x: -1200, y: -1000 };
    this.boundries.x2 = { x: 1200, y: 1200 };
  }

  public stop() {
    console.log('Server stoped:', this.gameLoopId);
    gameloop.clearGameLoop(this.gameLoopId);
    this.gameLoopId = undefined;
  }

  public start() {
    if (this.gameLoopId === undefined) {
      this.gameLoopId = gameloop.setGameLoop((delta) => {
        this.serverLoop(delta);
      }, this.tickRate);
      console.log('Server started: ', this.gameLoopId);
    }

    if (this.players.length === 0) {
      this.spawnDefaultEnemy();
      console.log('Enemy spawned');
    }
  }

  public checkOnlineState(): boolean {
    return this.hasActivePlayer() || this.activeConnectionCount > 0;
  }

  public hasActivePlayer(): boolean {
    return this.players.filter((player) => !player.isNPC).length > 0;
  }

  public serverLoop(delta: number) {
    if (this.checkOnlineState() === false) {
      this.stop();
    }

    this.gameLoop(delta);
    this.gc();
  }

  public onMessage(msg: Message, broadCast, singleCast) {
    super.onMessage(msg, broadCast, singleCast);
  }

  public send(msg) {
    this.onSend(msg);
  }
}
