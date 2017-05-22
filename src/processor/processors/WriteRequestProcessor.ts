import {Processor} from "./Processor";
import {WriteRequestMessage} from "DataModel";
import {WriteRequestResult} from "../results/WriteRequestResult";

export class WriteRequestProcessor implements Processor{
    process(message: WriteRequestMessage): WriteRequestResult {
        return null;
    }
}