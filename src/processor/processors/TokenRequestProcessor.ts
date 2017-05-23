import {Processor} from "./Processor";
import {TokenRequestMessage} from "DataModel";
import {TokenRequestResult} from "../results/TokenRequestResult";
import {Store} from "../../Store/Store";

export class TokenRequestProcessor implements Processor{
    process(message: TokenRequestMessage): Promise<TokenRequestResult> {
        const accessSession = message.body.accessSession;
        const token = Store.getInstance().addAccessSession(accessSession);
        return new Promise(((resolve, reject) => {
            resolve(new TokenRequestResult(token))
        })) ;
    }
}