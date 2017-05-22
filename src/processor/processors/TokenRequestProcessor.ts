import {Processor} from "./Processor";
import {TokenRequestMessage} from "DataModel";
import {TokenRequestResult} from "../results/TokenRequestResult";
import {Store} from "../../services/Store/Store";

export class TokenRequestProcessor implements Processor{
    process(message: TokenRequestMessage): TokenRequestResult {
        const accessSession = message.body.accessSession;
        const token = Store.getInstance().addAccessSession(accessSession);
        return new TokenRequestResult(token);
    }
}