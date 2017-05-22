import {Mapper} from "./Mapper";
import {DataRequestResult} from "../results/DataRequestResult";
import {DataResponseMessage} from "DataModel"

export class DataResponseMapper implements Mapper{
    map(requestId:string, result: DataRequestResult): DataResponseMessage {

        const buffer:Data[] = data.map((element)=>{console
            return new FileData(element)
        })

        buffer.push(new LastData())
        const responseMessage = ServerUtils.checkData(msgpack.encode(buffer), message.id);
        this.sendMessage(ServerUtils.getLargeStream(responseMessage),ws,()=>{})
    }
}
