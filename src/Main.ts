import {Server} from "./services/Server";
import {Store} from "./services/Store/Store";
import * as SFTP from "./services/SFTP/SFTP";


/*
SFTP.init(() => {
    console.log("ready");
    /*
    SFTP.readDir("/sftp/ikcdata/docs", (list:any) => {
        console.log("list", list);
    });
    */
    /*
    SFTP.readFile("/sftp/ikcdata/docs/index.json", (data:any) => {
        console.log("got buffer");
        //console.log(data);
    })
    */
/*});
*/


new Server();