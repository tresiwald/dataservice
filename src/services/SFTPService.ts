import {SSH} from "./SSHService";

let ssh: any;

export const init = (callback: Function) => {
    if (ssh) {
        callback();
    } else {
        ssh = new SSH();
        ssh.init(() => {
            callback();
        });
    }
};

export const readDir = (path: string, callback: Function) => {
    console.log("connected");
    ssh.readDir(path, callback);
};

export const readFile = (path: string, callback: Function) => {
    ssh.readFile(path, callback)
};

export const listFile = (path: string, callback: Function) => {
    ssh.listFiles(path, callback)
}

export const writeFile = (path: string, content: any, callback: Function) => {
    ssh.writeFile(path, content, callback)
}