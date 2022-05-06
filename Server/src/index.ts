import * as path from "path";
import { WsConnection, WsServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";

export const server = new WsServer(serviceProto, {
    port: 3000,
    json: true
});

async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    // TODO
    // Prepare something... (e.g. connect the db)
};

async function main() {
    await init();
    await server.start();
}
main();