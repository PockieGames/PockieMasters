import * as path from "path";
import { exit } from "process";
import { WsConnection, WsServer } from "tsrpc";
import Logger from "./logger";
import Database from "./database/Database";
import { serviceProto } from "./shared/protocols/serviceProto";
import User from "./database/models/User";

export const server = new WsServer(serviceProto, {
    port: 3001,
    json: true
});

async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    await Database.connect().catch(() => {
        Logger.error("Couldn't connect to Database")

        exit();
    })

    
    User.sync({alter: true})
    
    // TODO
    // Prepare something... (e.g. connect the db)
};

async function main() {
    await init()
    await server.start()
    Database.connection.sync({force:true})
}
main();