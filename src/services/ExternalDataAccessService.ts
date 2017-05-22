import {Store} from "./Store/Store";
import * as SFTP from "./SFTP/SFTP";
const fs = require('graceful-fs');
const path = require("path")
const readline = require("readline")
const Promise = require("bluebird");
const glob = require("glob")
const async = require('async');

export = ExternalDataAccessService

module ExternalDataAccessService {
    export const getData = (token: string, callback: Function) => {
        const preCompiledPaths = getPaths(token);
        if(preCompiledPaths.length == 1 && preCompiledPaths.indexOf("*.*") == -1){
            SFTP.init(() => {
                SFTP.listFile(("/sftp/ikcdata" + preCompiledPaths[1]), (paths: string[]) => {
                    console.log(paths)
                })
            })
        }else{
            const paths = preCompiledPaths.map((path: string) => {
                return ("/sftp/ikcdata" + path.substr(1, path.length - 1))
            })
            if (paths) {
                console.log("-----Path-----", paths)
                SFTP.init(() => {
                    async.map(
                        paths,
                        (path: any, callback: any) => {
                            SFTP.readFile(path, (data: any) => {
                                callback(null, {data: data, path: path})
                            })
                        },
                        (err: any, results: any) => {
                            callback(results)
                        })
                })
            } else {
                callback();
            }
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
}