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
                    "id": 0,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        }
    }
};