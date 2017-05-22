import {Result} from "../results/Result";
import {Message} from "DataModel";

export interface Mapper{
    map(requestId:string, result: Result):Message
}