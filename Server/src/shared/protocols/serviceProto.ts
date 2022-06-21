import { ServiceProto } from 'tsrpc-proto';
import { ReqTest, ResTest } from './PtlTest';
import { ReqAuth, ResAuth } from './user/PtlAuth';
import { ReqCreatePlayer, ResCreatePlayer } from './user/PtlCreatePlayer';
import { ReqHeroes, ResHeroes } from './user/PtlHeroes';
import { ReqLogout, ResLogout } from './user/PtlLogout';
import { ReqReg, ResReg } from './user/PtlReg';
import { ReqSummon, ResSummon } from './user/PtlSummon';
import { ReqUser, ResUser } from './user/PtlUser';

export interface ServiceType {
    api: {
        "Test": {
            req: ReqTest,
            res: ResTest
        },
        "user/Auth": {
            req: ReqAuth,
            res: ResAuth
        },
        "user/CreatePlayer": {
            req: ReqCreatePlayer,
            res: ResCreatePlayer
        },
        "user/Heroes": {
            req: ReqHeroes,
            res: ResHeroes
        },
        "user/Logout": {
            req: ReqLogout,
            res: ResLogout
        },
        "user/Reg": {
            req: ReqReg,
            res: ResReg
        },
        "user/Summon": {
            req: ReqSummon,
            res: ResSummon
        },
        "user/User": {
            req: ReqUser,
            res: ResUser
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 10,
    "services": [
        {
            "id": 3,
            "name": "Test",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 1,
            "name": "user/Auth",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 7,
            "name": "user/CreatePlayer",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 6,
            "name": "user/Heroes",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 4,
            "name": "user/Logout",
            "type": "api"
        },
        {
            "id": 2,
            "name": "user/Reg",
            "type": "api"
        },
        {
            "id": 7,
            "name": "user/Summon",
            "type": "api"
        },
        {
            "id": 5,
            "name": "user/User",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        }
    ],
    "types": {
        "PtlTest/ReqTest": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlTest/ResTest": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "user/PtlAuth/ReqAuth": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 2,
                    "name": "uuid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
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
        },
        "user/PtlAuth/ResAuth": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "user/PtlCreatePlayer/ReqCreatePlayer": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "hero",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "user/PtlCreatePlayer/ResCreatePlayer": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "user/PtlHeroes/ReqHeroes": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlHeroes/ResHeroes": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "heroes",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../types/Hero/Hero"
                        }
                    }
                }
            ]
        },
        "../types/Hero/Hero": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 1,
                    "name": "heroId",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                }
            ]
        },
        "user/PtlLogout/ReqLogout": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlLogout/ResLogout": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "user/PtlReg/ReqReg": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
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
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
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
        },
        "user/PtlSummon/ReqSummon": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlSummon/ResSummon": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "user/PtlUser/ReqUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlUser/ResUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../types/User/User"
                    }
                }
            ]
        },
        "../types/User/User": {
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
                    "name": "username",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "currencyPremium",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 3,
                    "name": "currencyFree",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                },
                {
                    "id": 4,
                    "name": "tutorialStep",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                }
            ]
        }
    }
};