import {Processor} from "./Processor";
import {DataRequestMessage} from "DataModel";
import {DataRequestResult} from "../results/DataRequestResult";
import {ExternalDataElement, ExternalDataAccessService} from "../../services/ExternalDataAccessService";

export class DataRequestProcessor implements Processor{
    process(message: DataRequestMessage): Promise<DataRequestResult> {
        const token = message.body.token

        return new Promise((resolve, reject)=> {
            ExternalDataAccessService.getData(token, (data: ExternalDataElement[]) => {
                console.log("data ready, sending it to client");
                if(data.length > 0){
                    resolve(data)
                }else{
                    reject()
                }
            })
        })
    }
}