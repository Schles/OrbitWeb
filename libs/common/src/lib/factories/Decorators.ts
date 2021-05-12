import { FactoryTypes, GameFactory } from './GameFactory';

export const Client = (type: FactoryTypes, name: string) => {
  return (target) => {
    GameFactory.registerClient(type, name, target);
  }
}



export const Server = (type: FactoryTypes, name: string) => {
  return (target) => {
    GameFactory.registerServer(type, name, target);
  }
}