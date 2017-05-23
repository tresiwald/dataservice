import {Mapper} from "./Mapper";
import {MessageFactory, MessageType, WriteRequestMessage, WriteResponseBody} from "DataModel";
import {WriteRequestResult} from "../results/WriteRequestResult";

export class WriteResponseMapper implements Mapper{
    map(requestId:string, result: WriteRequestResult): Promise<WriteRequestMessage> {
        return new Promise((resolve, reject) => {
            const message = MessageFactory.getMessageWithBodyAndID(
                MessageType.WRITE_RESPONSE,
                new WriteResponseBody(),
                requestId
            )
            resolve(message)
        })
    }
}