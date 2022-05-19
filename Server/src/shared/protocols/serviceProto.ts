import { ServiceProto } from 'tsrpc-proto';
import { ReqAuth, ResAuth } from './user/PtlAuth';
import { ReqReg, ResReg } from './user/PtlReg';

export interface ServiceType {
    api: {
        "user/Auth": {
            req: ReqAuth,
            res: ResAuth
        },
        "user/Reg": {
            req: ReqReg,
            res: ResReg
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
        {
            "id": 1,
            "name": "user/Auth",
            "type": "api"
        },
        {
            "id": 2,
            "name": "user/Reg",
            "type": "api"
        }
    ],
    "types": {
        "user/PtlAuth/ReqAuth": {
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
        "user/PtlAuth/ResAuth": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
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
        },
        "user/PtlReg/ReqReg": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uuid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "osInfos",
                    "type": {
                        "type": "Reference",
                        "target": "../types/UserSystemInfos/UserSystemInfos"
                    }
                }
            ]
        },
        "../types/UserSystemInfos/UserSystemInfos": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "language",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "os",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "osVersion",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "user/PtlReg/ResReg": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "identifier",
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
        }
    }
};