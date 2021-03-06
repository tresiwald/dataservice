import {Message, MessageType} from "DataModel";
import * as Common from "../common/Common";
import {Processor} from "./processors/Processor";
import {Mapper} from "./mappers/Mapper";
import {Result} from "./results/Result";
import {TokenRequestProcessor} from "./processors/TokenRequestProcessor";
import {TokenResponseMapper} from "./mappers/TokenResponseMapper";
import {DataRequestProcessor} from "./processors/DataRequestProcessor";
import {DataResponseMapper} from "./mappers/DataResponseMapper";
import {WriteRequestProcessor} from "./processors/WriteRequestProcessor";
import {WriteResponseMapper} from "./mappers/WriteResponseMapper";

export = MessageManager

module MessageManager{
    export const handleMessage = (message:Message, callback:Function ) =>{
        let request = mixInProcessor(message, callback)
        request.run()
    }
    const mixInProcessor = (message: Message, callback: Function):Request => {
        switch (message.type.value) {
            case MessageType.TOKEN_REQUEST.value:
                Common.applyMixins(Request, [TokenRequestProcessor,TokenResponseMapper]);
                return new Request(message, callback);
            case MessageType.DATA_REQUEST.value:
                Common.applyMixins(Request, [DataRequestProcessor,DataResponseMapper]);
                return new Request(message, callback);
            case MessageType.WRITE_REQUEST.value:
                Common.applyMixins(Request, [WriteRequestProcessor,WriteResponseMapper]);
                return new Request(message, callback);
        }
    }
}

class Request implements Processor, Mapper{
    message: Message;
    callback: Function;
    process: (message: Message) => Promise<Result>;
    map: (requestId:string, result: Result) => Promise<Message>;

    constructor(message: Message, callback: Function) {
        this.message = message;
        this.callback = callback;
    }

    run = () =>{
        this.process(this.message).then((result) => {
            this.map(this.message.id, result).then((returnMessage) => {
                this.callback(returnMessage)
            }).catch(() => {
                console.log("Error mapping result")
            })
        }).catch(() => {
            console.log("Error processing result")
        })
    }
}