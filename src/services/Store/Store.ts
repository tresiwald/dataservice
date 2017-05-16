import {AccessSession} from "DataModel";
import * as Common from "../../Common";
export class Store {

    private static _instance: Store = new Store();
    private tokenAccessMap: Map<string, AccessSession> = new Map();

    constructor() {
        if (Store._instance) {
            throw new Error("Error: Instantiation failed: Use GlobalConfig.getInstance() instead of new.");
        }
        Store._instance = this;
    }

    static getInstance():Store {
        return this._instance;
    }

    addAccessSession(accessSession: AccessSession):string {
        const uuid = Common.generateRandomUuid();
        this.tokenAccessMap.set(uuid, accessSession);
        return uuid;
    }

    getAccessSession(token: string):AccessSession {
        const accessSession = this.tokenAccessMap.get(token);
        this.tokenAccessMap.delete(token);
        return accessSession;
    }


}