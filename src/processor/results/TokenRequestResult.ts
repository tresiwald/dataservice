import {Result} from "./Result";
export class TokenRequestResult implements Result{
    token: string

    constructor(token: string) {
        this.token = token;
    }
}