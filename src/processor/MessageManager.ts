import {
    DataRequestMessage, Message, MessageType, TokenRequestMessage
} from "DataModel";
import * as Common from "../Common";
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
    process: (message: Message) => Result;
    map: (result: Result) => Message;

    constructor(message: Message, callback: Function) {
        this.message = message;
        this.callback = callback;
    }

    run = () =>{
        let result = this.process(this.message)
        let returnMessage = this.map(result)
        this.callback(returnMessage)
    }
}