import {Store} from "./Store/Store";
import * as SFTP from "./SFTP/SFTP";
const fs = require('graceful-fs');
const path = require("path")
const readline = require("readline")
const Promise = require("bluebird");
const glob = require("glob")

export const getData = (token: string, callback: Function) => {
    const path = getPath(token);
    console.log("-----Path-----",path)
    if (path) {
        //return fs.createReadStream(path, 'utf8');

        /*
        fs.readFile(path, 'utf8', (err: any, data: any) => {
            console.log("file read done");
            callback(data);
        })
        */
        SFTP.init(() => {
            SFTP.readFile(("/sftp/ikcdata" + path.substr(1,path.length - 1)), (buffer:any) => {
                callback(buffer)
            });
        });

    } else {
        // token not available, so no data is returned
        callback();
    }
}

const getPath = (token: string) => {
    const accessSession = Store.getInstance().getAccessSession(token);
    if (accessSession) {
        console.log("found token");
        return accessSession.path;
    } else {
        console.log("no token");
    }
}