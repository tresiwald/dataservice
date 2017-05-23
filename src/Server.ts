import {Message} from "DataModel";
import * as safeBuffer from "safe-buffer";
import * as MessageManager from "./processor/MessageManager";
import SocketStore from "./common/SocketStore";
const fs = require('fs');
const Buffer = safeBuffer.Buffer;
const BufferStream = require('stream');
const port = 8080;
const Promise = require("bluebird");
const allowedOrigins = "https://localhost:8888  http://localhost:8888 *://*:*";
const path = require('path');
const ss = require('socket.io-stream');
const msgpack = require("msgpack-lite");

const cfg = {
        ssl: true,
        port: 8080,
        ssl_key: './tls/server.key',
        ssl_cert: './tls/server.crt'
    };

export class Server {

    io: any;
    socketStore = new SocketStore()

    constructor() {
        this.startServer();
        console.log("Servers up and running.");
    }

    startServer = () => {
        const server = require('https').createServer({
            key: fs.readFileSync( cfg.ssl_key ),
            cert: fs.readFileSync( cfg.ssl_cert )
        })
        this.io = require('socket.io').listen(server);//, {origins: allowedOrigins});
        //
        this.io.set('origins', 'https://localhost:8888  http://localhost:8888 *://*:*');
        //this.io.set('transports', [ 'websocket' ]);
        server.listen(cfg.port);
        this.waitForConnection();
    };

    waitForConnection = () => {
        this.io.on('connection', (socket: any) => {
            console.log(socket.conn.transport.name)
            console.log("socket connected");

            socket.on('error', (err:any) => console.log("error: ",err));
            socket.on('disconnect', (err:any) => console.log("disconnect: ",err));
            socket.on('event', (err:any) => console.log("event: ",err));

            // send data stream to server
            ss(socket).on('route', (stream: any) => {

                stream.on('error', (err:any) => console.log("error: ",err));
                stream.on('disconnect', (err:any) => console.log("disconnect: ",err));
                stream.on('event', (err:any) => console.log("event: ",err));
                console.log("on.route");
                this.processRequest(stream, socket);
            });
        });
    };

    processRequest = (stream: any, ws: WebSocket) => {
        StreamingHelper.streamToData(stream, (data: any) => {
            this.processPayload(stream, data, ws);
        });
    };

    processPayload = ((stream:any, message: Message, ws: WebSocket) => {
        console.log(message);
        this.socketStore.setSocket(message.id,ws)
        MessageManager.handleMessage(message, this.prepareMessage)
    });

    prepareMessage = (message: Message) => {
        this.sendMessage(StreamingHelper.getLargeStream(message), this.socketStore.getSocket(message.id), () => {
        })
    }

    public sendMessage = (stream: any, ws: WebSocket, callback: Function) => {
        ss(ws).emit('route', stream);
        //this.waitForConnection();
        callback();
    };

}

module StreamingHelper {
    export const getLargeStream = (msg: Message): any => {
        const stream = ss.createStream();
        const arrayBuffer = msgpack.encode(msg);
        const bufferStream = new BufferStream.PassThrough();
        
        for(var i = 0; i<arrayBuffer.length; i = i + 1000000){
            if((i + 1000000) < arrayBuffer.length){
                console.log("Put", i, (i+1000000))
                bufferStream.write(arrayBuffer.slice(i, i+ 1000000))
            }else{
                bufferStream.write(arrayBuffer.slice(i, i+ arrayBuffer.length))
            }
        }
        
        bufferStream.end();
        bufferStream.pipe(stream);
        return stream;
    };

    export const streamToData = (stream: any, callback: Function) => {
        let bufs: any[] = [];
        stream.on("data", (chunk: any) => {
            bufs.push(chunk);
        }).on("end", () => {
            const buf = Buffer.concat(bufs);
            const msg = msgpack.decode(buf);
            callback(msg);
        });
    };
}
