import {Processor} from "./Processor";
import {WriteRequestMessage} from "DataModel";
import {WriteRequestResult} from "../results/WriteRequestResult";
import {ExternalDataAccessService} from "../../services/ExternalDataAccessService";

export class WriteRequestProcessor implements Processor{
    process(message: WriteRequestMessage): Promise<WriteRequestResult> {
        return new Promise(((resolve, reject) => {
            ExternalDataAccessService.writeData(message.body.token, message.body.data, () => {
                resolve(new WriteRequestResult())
            })
        }))
    }
}