import {Mapper} from "./Mapper";
import {Message, MessageFactory, MessageType, TokenResponseBody} from "DataModel"
import {TokenRequestResult} from "../results/TokenRequestResult";

export class TokenResponseMapper implements Mapper{
    map(requestId:string, result: TokenRequestResult): Message {
        const responseMessage = MessageFactory.getMessageWithBodyAndID(
            MessageType.TOKEN_RESPONSE,
            new TokenResponseBody(result.token),
            requestId
        );
        return responseMessage
    }
}