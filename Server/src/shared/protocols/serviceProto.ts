import { ServiceProto } from 'tsrpc-proto';
import { ReqAuth, ResAuth } from './PtlAuth';

export interface ServiceType {
    api: {
        "Auth": {
            req: ReqAuth,
            res: ResAuth
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 1,
    "services": [
        {
            "id": 0,
            "name": "Auth",
            "type": "api"
        }
    ],
    "types": {
        "PtlAuth/ReqAuth": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlAuth/ResAuth": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "account",
                    "type": {
                        "type": "Reference",
                        "target": "../types/Account/Account"
                    }
                }
            ]
        },
        "../types/Account/Account": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                }
            ]
        }
    }
};