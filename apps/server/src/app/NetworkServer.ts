import {createServer } from 'http';
import { Server, Socket } from "socket.io";


import {GameServer} from "./GameServer";
import {Message} from "@orbitweb/common";

export class NetworkServer {
  public static readonly PORT:number = 8000;
  private port: string | number;

  private io: Server;
  private gameServer: GameServer;

  private httpServer = createServer();

  constructor() {
    this.gameServer = new GameServer();
    this.port = process.env.PORT || NetworkServer.PORT;

    this.init();  
  }

  public start() {
    
    this.httpServer.listen(this.port);
    console.log('Running server on port %s', this.port);
  }

  private init() {
    this.io = new Server(this.httpServer, { 
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    this.gameServer.onSend = (msg) => { 
      this.io.emit("message", msg);
    };

    this.io.on('connection', (socket: Socket) => {
      this.onClientConnect(socket);
    });
  }

  

  private onClientConnect(socket: Socket) {
    console.log('Connected client on port %s:%s.', socket.handshake.address, this.port);

    this.gameServer.activeConnectionCount++;
    this.gameServer.start();

    socket.on('message', (m: Message) => {
      this.gameServer.onMessage(m, this.io, socket);
    });

    socket.on('disconnect', () => {
      this.gameServer.activeConnectionCount--;
    });
  }
}
