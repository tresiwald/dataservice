import {Result} from "./Result";
import {ExternalDataElement} from "../../services/ExternalDataAccessService";

export class DataRequestResult implements Result{
    buffer:ExternalDataElement[];

    constructor(buffer: ExternalDataElement[]) {
        this.buffer = buffer;
    }
}