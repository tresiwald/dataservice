import {Mapper} from "./Mapper";
import {DataRequestResult} from "../results/DataRequestResult";
import {DataResponseMessage} from "DataModel"

export class DataResponseMapper implements Mapper{
    map(requestId:string, result: DataRequestResult): Promise<DataResponseMessage> {
        return null
    }
}
