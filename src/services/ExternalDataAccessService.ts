import {Store} from "../Store/Store";
import * as SFTP from "./SFTPService";
import construct = Reflect.construct;
const fs = require('graceful-fs');
const path = require("path")
const readline = require("readline")
const Promise = require("bluebird");
const glob = require("glob")
const async = require('async');

export module ExternalDataAccessService {
    export const getData = (token: string, callback: Function) => {
        const preCompiledPaths = getPaths(token);
        if(preCompiledPaths.length == 1 && preCompiledPaths.indexOf("*.*") == -1){
                SFTP.init(() => {
                    SFTP.listFile(("/sftp/ikcdata" + preCompiledPaths[0].substr(1, preCompiledPaths[0].length - 1)), (paths: string[]) => {
                            async.map(
                                paths,
                                (path: any, callback: any) => {
                                    SFTP.readFile(path, (data: any) => {
                                        callback(null, new ExternalDataElement(path, data))
                                    })
                                },
                                (err: any, results: any) => {
                                    callback(results)
                                })

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
                                callback(null, new ExternalDataElement(path, data))
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

    export const writeData = (token: string, buffer: any, callback: Function) => {
        const path = getPaths(token)[0];

        SFTP.init(() => {
            SFTP.writeFile(path, buffer, () => {
                callback()
            })
        })

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

export class ExternalDataElement {
    path: string;
    data: Buffer;

    constructor(path: string, data: Buffer) {
        this.path = path;
        this.data = data;
    }
}