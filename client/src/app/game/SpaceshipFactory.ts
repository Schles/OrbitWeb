import {Spaceship} from "./Spaceship";

export class SpaceshipFactory {
  public static create(name: string, type: string, color?: string): Spaceship {

    const spaceship: Spaceship = new Spaceship(name, color);

      switch (type) {

        case "intercepter":
          spaceship.health = 50;
          spaceship.maxSpeed = 70;
          spaceship.maxOmega = 3;
          spaceship.cannon.maxOmega = 6;
          spaceship.cannon.damage = 2.5;
          spaceship.cannon.cooldownDuration = 1.5;
          spaceship.cannon.range = 400;
          spaceship.shipSize = 5;
          break;

        case "tank":
          spaceship.health = 250;
          spaceship.maxSpeed = 30;
          spaceship.maxOmega = 0.5;
          spaceship.cannon.maxOmega = 0.1;
          spaceship.cannon.damage = 20;
          spaceship.cannon.range = 500;
          spaceship.cannon.cooldownDuration = 10;
          spaceship.shipSize = 20;
          break;


        default:
          spaceship.cannon.damage = 10;
          spaceship.cannon.cooldownDuration = 5;
          spaceship.maxSpeed = 99;
          spaceship.color = color;
          //spaceship.cannon.range = 10;
          spaceship.shipSize = 10;
          spaceship.maxOmega = 0.6;
          break;
      }

    return spaceship;
  }
}
