import {Mapper} from "./Mapper";
import {DataRequestResult} from "../results/DataRequestResult";
import {DataResponseMessage, MessageFactory, ErrorResponseBody, MessageType, Data, FileData, LastData} from "DataModel"
import {ExternalDataElement} from "../../services/ExternalDataAccessService";
const msgpack = require("msgpack-lite");

export class DataResponseMapper implements Mapper{
    map(requestId:string, result: DataRequestResult): Promise<DataResponseMessage> {
        console.log("data ready, sending it to client");
        const buffer:Data[] = result.buffer.map((element: ExternalDataElement)=>{
            return new FileData(element.data, element.path)
        })
        buffer.push(new LastData())
        return new Promise(((resolve, reject) => {
            const responseMessage = DataResponseMapperHelper.checkData(msgpack.encode(buffer), requestId);
            resolve(responseMessage)
        }))
    }
}

module DataResponseMapperHelper {
    export const checkData = (data: any, oldMsgId: string): any => {
        if (data) {
            return MessageFactory.getMessageWithBodyAndID(MessageType.DATA_RESPONSE, data, oldMsgId);
        } else {
            return MessageFactory.getMessageWithBody(MessageType.ERROR_RESPONSE,
                new ErrorResponseBody("token not available"));
        }
    };
}