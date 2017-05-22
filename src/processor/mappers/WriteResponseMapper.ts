import {Mapper} from "./Mapper";
import {WriteRequestMessage} from "DataModel"
import {WriteRequestResult} from "../results/WriteRequestResult";

export class WriteResponseMapper implements Mapper{
    map(requestId:string, result: WriteRequestResult): WriteRequestMessage {
        return null;
    }
}