import * as path from "path";
import { WsConnection, WsServer } from "tsrpc";
import Logger from "./logger";
import Database from "./models/Database";
import { serviceProto } from "./shared/protocols/serviceProto";

export const server = new WsServer(serviceProto, {
    port: 3001,
    json: true
});

async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    await Database.connect().catch(() => {
        Logger.error("Couldn't connect to Database")
    })

    // TODO
    // Prepare something... (e.g. connect the db)
};

async function main() {
    await init()
    if(Database.connection.state != "disconnected")
        await server.start()
}
main();