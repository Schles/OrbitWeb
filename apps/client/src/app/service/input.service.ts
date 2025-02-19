import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this.gameService
      .app()
      .renderer.renderer.plugins.interaction.on('pointerup', (event) => {
        this.gameService.app().inputManager.onMouseUp(event);
      });

    this.gameService
      .app()
      .renderer.renderer.plugins.interaction.on('mousemove', (event) => {
      this.gameService.app().inputManager.onMouseMove(event);
    });


    this.gameService
      .app()
      .renderer.renderer.plugins.interaction.on('pointerdown', (event) => {
        this.gameService.app().inputManager.onMouseDown(event);
      });

    window.addEventListener('keydown', (event) => {
      if (this.playerService.isLoggedIn()) {
        if (event.key === '1') {
          this.keyPressed(1);
        } else if (event.key === '2') {
          this.keyPressed(2);
        } else if (event.key === '3') {
          this.keyPressed(3);
        } else if (event.key === '4') {
          this.keyPressed(4);
        } else if (event.key === '5') {
          this.keyPressed(5);
        } else if (event.key === ' ') {
          this.keyPressed(-1);
        } else if (event.key === "Escape") {
          this.keyPressed(-2);
        }
      }
    });
  }

  public keyPressed(key) {
    this.gameService.app().inputManager.onKeyDown(key);
  }
}
