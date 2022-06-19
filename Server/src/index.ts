import * as path from "path";
import { exit } from "process";
import { HttpServer, WsConnection, WsServer } from "tsrpc";
import Logger from "./logger";
import Database from "./database/Database";
import { serviceProto } from "./shared/protocols/serviceProto";
import User from "./database/models/User";
import { enableAuthentication, parseCurrentUser } from "./models/UserUtil";
import { spells } from "./shared/game/SharedConstants";
import TestSpell from "./shared/game/data/Spells/TestSpell";

export const server = new HttpServer(serviceProto, {
    port: 3001,
    json: true
})

parseCurrentUser(server)
enableAuthentication(server)

async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    await Database.connect().catch(() => {
        Logger.error("Couldn't connect to Database")

        exit();
    })
    
};

async function main() {
    await init()
    await server.start()
}

main();