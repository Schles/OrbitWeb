import { ShipFitting, Spaceship, Vector2 } from '@orbitweb/common';

export type UIEvents = {
  UI_PLAYER_LOGIN: { name: string; fitting: ShipFitting; spaceship: Spaceship };
  UI_PLAYER_KILLED: { died: string, killer: string };
  GAME_MOUSE_MOVE: { local: Vector2, global: Vector2};
  GAME_MOUSE_CLICK: { local: Vector2, global: Vector2};
};
