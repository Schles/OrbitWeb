import { ShipFitting, Spaceship } from '@orbitweb/common';

export type UIEvents = {
  UI_PLAYER_LOGIN: { name: string; fitting: ShipFitting; spaceship: Spaceship };
  UI_PLAYER_KILLED: string;
};
