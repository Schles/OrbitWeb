import {createServer } from 'http';
import * as express from 'express';
import { Server, Socket } from "socket.io";


import {GameServer} from "./game/GameServer";
import {Message} from "@orbitweb/common";

export class ChatServer {
  public static readonly PORT:number = 8000;
  private app: express.Application;
  
  private io: Server;
  private port: string | number;

  private gameServer: GameServer;


  private httpServer = createServer();

  constructor() {
    this.config();
  
    this.sockets();
    this.listen();

    this.httpServer.listen(this.port);
    console.log('Running server on port %s', this.port);
  }

  private createApp(): void {
    this.app = express();
  }

  

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = new Server(this.httpServer, { cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }});
    this.gameServer = new GameServer(this.io);
  }

  private listen(): void {
      this.io.on('connection', (socket: Socket) => {
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
