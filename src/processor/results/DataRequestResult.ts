import {Result} from "./Result";
export class DataRequestResult implements Result{
    buffer:Buffer[];

    constructor(buffer: Buffer[]) {
        this.buffer = buffer;
    }
}