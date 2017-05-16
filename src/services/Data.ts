import {Store} from "./Store/Store";
import * as SFTP from "./SFTP/SFTP";
const fs = require('graceful-fs');
const path = require("path")
const readline = require("readline")
const Promise = require("bluebird");
const glob = require("glob")
const async = require('async');

export const getData = (token: string, callback: Function) => {
    let paths = {}
    getPaths(token).forEach((path: string, index:number) => {
        paths[('path'+index.toString())]= ("/sftp/ikcdata" + path.substr(1, path.length - 1))
    })
    console.log("-----Path-----", paths)
    SFTP.init(() => {
        async.mapSeries(
            paths,
            (path:any,callback:any)=> {
                SFTP.readFile(path, callback)
            },
            (results: any, err: any) => {
                callback(results)
            })
    })

    if (paths) {
    } else {
        callback();
    }
}

const getPaths = (token: string) => {
    const accessSession = Store.getInstance().getAccessSession(token);
    if (accessSession) {
        console.log("found token");
        return accessSession.path;
    } else {
        console.log("no token");
    }
}