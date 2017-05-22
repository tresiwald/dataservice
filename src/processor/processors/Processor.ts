import {Message} from "DataModel";
import {Result} from "../results/Result";

export interface Processor{
    process(message:Message): Promise<Result>
}