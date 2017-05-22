const Client = require('ssh2').Client,
    config = {
        host: "ikc-data.enterpriselab.ch",
        port: 22,
        user: "ikc-data",
        keyPath: "./res/ssh/ikc-data",
        docDir: "/sftp/ikcdata/docs"
    },
    path = require('path');

export class SSH {

    private conn: any;
    private sftp: any;

    constructor() {
        this.conn = new Client();
    }

    public init = (callback: Function) => {
        this.connect((sftp: any) => {
            this.sftp = sftp;
            callback();
        });
    };

    private connect = (callback: Function, host?: string, user?: string, privateKey?: string) => {

        this.conn.on('ready', () => {
            console.log('Client :: ready');
            this.conn.sftp((err: any, sftp: any) => {
                if (err) throw err;
                callback(sftp);
                /*
                 sftp.opendir('/sftp', (err:any, res:any) => {
                 if (err) throw err;
                 console.dir(res);
                 });
                 */
                /*
                 sftp.readdir(config.docDir, (err:any, list:any) => {
                 if (err) throw err;
                 console.dir(list);
                 conn.end();
                 });
                 */
            });
            /*
             conn.exec('uptime', function(err, stream) {
             if (err) throw err;
             stream.on('close', function(code, signal) {
             console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
             conn.end();
             }).on('data', function(data) {
             console.log('STDOUT: ' + data);
             }).stderr.on('data', function(data) {
             console.log('STDERR: ' + data);
             });
             });*/
        }).connect({
            host: config.host,
            port: config.port,
            username: config.user,
            privateKey: require('fs').readFileSync(config.keyPath)
        });

    };

    public readDir = (path: string, callback: Function) => {
        this.sftp.readdir(path, (err: any, list: any) => {
            if (err) throw err;
            callback(list);
        });
    };

    public readFile = (path: string, callback: Function) => {
        this.sftp.readFile(path, (err:any, buffer:any) => {
            if(err) throw err;

            callback(buffer);
        });
    }

    public listFiles = (path: string, callback: Function) => {
        this.sftp.exec(("ls -d -1 " + path), (err:any, stream:any) => {
            console.log(stream)
            callback(stream)
        })
    }

    private end = () => {
        this.conn.end();
    }

    /*
     export const pwd = (): Promise<any> => {
     return ssh.execCommand('pwd');
     };

     export const putFile = (): Promise<any> => {
     return ssh.putFile('/home/steel/Lab/localPath', '/home/steel/Lab/remotePath').then(() => {
     console.log("The File thing is done")
     }, (error:any) => {
     console.log("Something's wrong")
     console.log(error)
     })
     };
     */

}