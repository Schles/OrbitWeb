import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';


import {GameServer} from "./game/GameServer";
import {Message} from "../../shared/src/message/Message";

export class ChatServer {
  public static readonly PORT:number = 8000;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  private gameServer: GameServer;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();


  }

  private createApp(): void {

    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
    this.gameServer = new GameServer(this.io);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      this.gameServer.activeConnectionCount++;
      this.gameServer.start();


      socket.on('message', (m: Message) => {
        this.gameServer.onMessage(m, this.io, socket);
      });

      socket.on('disconnect', () => {
        this.gameServer.activeConnectionCount--;
      });
    });

  }

  public getApp(): express.Application {
    return this.app;
  }
}
