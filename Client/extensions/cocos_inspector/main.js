'use strict';
const _0x18b6 = [
    'lready!',
    'Visibility',
    'gaNkZ',
    'yZFvX',
    './icon.png',
    'gvhaS',
    'exports',
    'type',
    '#2e2c29',
    'server',
    'd.js',
    'ready-to-s',
    'parse',
    'ector\x20v',
    ':focusAsse',
    './package.',
    'aScript',
    'webContent',
    'JRKlY',
    '78010qiVsty',
    'Cocos\x20Insp',
    'request',
    'Windows',
    'JMphH',
    'join',
    'cKjIJ',
    'ggleSimple',
    'rMain',
    'destroy',
    'unselect',
    'Selection',
    'Sec',
    'WUwuF',
    '&mode=',
    'show',
    '874924iuQBlO',
    'loadURL',
    'UZZBo',
    'nspector-c',
    'disRS',
    'snVnG',
    'name',
    '1345610iASwuG',
    '1228848cXCFzu',
    'tml',
    'HPjgm',
    'hLmrn',
    'index_low_',
    'append',
    'JaruK',
    'has\x20tray\x20a',
    'HyJGj',
    'Menu',
    'setImage',
    'mtkJR',
    'node',
    'mainPreloa',
    'de(',
    'select',
    'Path',
    'onfig.json',
    'broadcast',
    '../cocos-i',
    'version',
    'nfigDataFo',
    'FBtrE',
    'error',
    'click',
    'executeJav',
    'ui-kit:tou',
    '1ablyZi',
    'asset',
    'aCQwC',
    'file://',
    'myixl',
    '180127pcpywm',
    'setContext',
    'json',
    'electron.h',
    'then',
    'how',
    'DDKRq',
    'readFileSy',
    'Message',
    'existsSync',
    'includes',
    'osFJh',
    'JUJoQ',
    'ch-asset',
    'query-port',
    'Sytti',
    '3UOuHvp',
    'createFrom',
    '649714aOTJeA',
    'index.html',
    'Toggle\x20Min',
    'config.jso',
    ':focusNode',
    'nkPez',
    'Mode()',
    'split',
    '?port=',
    'isPortrait',
    'simpleMode',
    'electron',
    'closed',
    'versions',
    'DODdQ',
    'OvdQh',
    'getSelecte',
    'Mirtj',
    'utf-8',
    '895380WNuVcY',
    'removeAllL',
    'i\x20Mode',
    'warn',
    'setMenuBar',
    'isteners',
    'disableWeb',
    'size',
    'process',
    'resize',
    'lCoYZ',
    'v.switchMo',
    'setting.co',
    'AKdBB',
    'setting.to',
    'TbEcZ',
    'path',
    'setMenu',
    'oXHqi'
];
const _0x2840a7 = _0x2c60;
(function (_0x5bb43c, _0x211776) {
    const _0x3748a3 = _0x2c60;
    while (!![]) {
        try {
            const _0x209815 = parseInt(_0x3748a3(0x146)) * -parseInt(_0x3748a3(0x1b2)) + parseInt(_0x3748a3(0x196)) + -parseInt(_0x3748a3(0x18f)) + parseInt(_0x3748a3(0x1b7)) * parseInt(_0x3748a3(0x144)) + parseInt(_0x3748a3(0x197)) + -parseInt(_0x3748a3(0x159)) + parseInt(_0x3748a3(0x17f));
            if (_0x209815 === _0x211776)
                break;
            else
                _0x5bb43c['push'](_0x5bb43c['shift']());
        } catch (_0x4cc47b) {
            _0x5bb43c['push'](_0x5bb43c['shift']());
        }
    }
}(_0x18b6, 0x59931 + 0x3b0a1 + 0x2810d));
const {BrowserWindow, app, remote, ipcMain, Menu, Tray, nativeImage, MenuItem} = require(_0x2840a7(0x151)), path = require(_0x2840a7(0x169)), pcs = require(_0x2840a7(0x161)), os = require('os'), folder = '', devTools = ![];
let win, tray = null, mode = -0xbaf + -0x1768 + 0x2317, unloaded = ![];
const PKG_NAME = require(_0x2840a7(0x17b) + _0x2840a7(0x1b9))[_0x2840a7(0x195)], PKG_VERSION = require(_0x2840a7(0x17b) + _0x2840a7(0x1b9))[_0x2840a7(0x1ab)];
let fs = require('fs'), _configPath = path[_0x2840a7(0x184)](__dirname, _0x2840a7(0x149) + 'n'), __parentConfig = path[_0x2840a7(0x184)](__dirname, _0x2840a7(0x1aa) + _0x2840a7(0x192) + _0x2840a7(0x1a8));
function readConfig() {
    const _0x56c0f0 = _0x2840a7, _0x48504d = { 'JMphH': _0x56c0f0(0x158) };
    let _0x5a9d39 = '';
    return fs[_0x56c0f0(0x13d)](__parentConfig) ? _0x5a9d39 = fs[_0x56c0f0(0x13b) + 'nc'](__parentConfig, { 'encoding': _0x48504d[_0x56c0f0(0x183)] }) : _0x5a9d39 = fs[_0x56c0f0(0x13b) + 'nc'](_configPath, { 'encoding': _0x48504d[_0x56c0f0(0x183)] }), JSON[_0x56c0f0(0x178)](_0x5a9d39);
}
let config = readConfig(), disableWebSec = Boolean(config[_0x2840a7(0x15f) + _0x2840a7(0x18b)]), dw = 0x1cf * -0x13 + -0x155a + 0x37b7, dh = 0xd8f + 0x22a4 * -0x1 + 0x1515;
function changeDWH() {
    const _0x55a081 = _0x2840a7, _0x25ead0 = {
            'JaruK': _0x55a081(0x182),
            'nkPez': function (_0x3808e5, _0x1f2c9c) {
                return _0x3808e5 + _0x1f2c9c;
            }
        };
    dw = config[_0x55a081(0x150)] ? config[_0x55a081(0x14f)] ? config[_0x55a081(0x160)][0x2c4 * -0x4 + -0x382 + 0x2 * 0x749] : config[_0x55a081(0x160)][-0x20d4 + 0x437 * 0x1 + 0x1c9e] : -0x2 * 0x1199 + 0x1d62 + 0x93e, os[_0x55a081(0x173)]()[_0x55a081(0x13e)](_0x25ead0[_0x55a081(0x19d)]) && (dw += config[_0x55a081(0x150)] ? 0x3 * -0x503 + 0x8c + 0xe8f : -0x25a6 + 0x2571 + 0x1 * 0x4d), dh = config[_0x55a081(0x150)] ? _0x25ead0[_0x55a081(0x14b)](config[_0x55a081(0x14f)] ? config[_0x55a081(0x160)][0x1 * 0x1579 + -0x384 + -0x11f4] : config[_0x55a081(0x160)][-0xdf * -0x26 + -0x13ad + -0xd6d], -0x21 * -0x88 + -0x10fd * -0x1 + -0x3 * 0xb67) : 0x38c * 0x1 + -0x967 * -0x3 + -0x1d69;
}
changeDWH(), module[_0x2840a7(0x172)] = {
    async 'load'() {
        const _0xc72448 = _0x2840a7;
        ipcMain['on'](PKG_NAME + _0xc72448(0x14a), focusNode), ipcMain['on'](PKG_NAME + (_0xc72448(0x17a) + 't'), focusAsset);
    },
    'unload'() {
        const _0x1f38b5 = _0x2840a7;
        unloaded = !![], ipcMain[_0x1f38b5(0x15a) + _0x1f38b5(0x15e)](PKG_NAME + _0x1f38b5(0x14a)), ipcMain[_0x1f38b5(0x15a) + _0x1f38b5(0x15e)](PKG_NAME + (_0x1f38b5(0x17a) + 't'));
    },
    'methods': {
        'previewMode'() {
            const _0x2eff47 = _0x2840a7, _0x13a3a3 = {
                    'mtkJR': function (_0x326e7f, _0x567b9e) {
                        return _0x326e7f(_0x567b9e);
                    }
                };
            if (unloaded)
                return;
            _0x13a3a3[_0x2eff47(0x1a2)](tryShowWindow, -0x1a07 * -0x1 + -0x1a * -0x5c + 0x1 * -0x235f);
        },
        'buildMobileMode'() {
            const _0x4dbee7 = _0x2840a7, _0x3287b2 = {
                    'lCoYZ': function (_0xd47995, _0x3bb8bc) {
                        return _0xd47995(_0x3bb8bc);
                    }
                };
            if (unloaded)
                return;
            _0x3287b2[_0x4dbee7(0x163)](tryShowWindow, -0xc * 0x33b + 0x1 * -0x9b9 + -0x183f * -0x2);
        },
        'buildDesktopMode'() {
            const _0x5e2d1d = _0x2840a7, _0xd3b74 = {
                    'Mirtj': function (_0xa203f2, _0x8c1fca) {
                        return _0xa203f2(_0x8c1fca);
                    }
                };
            if (unloaded)
                return;
            _0xd3b74[_0x5e2d1d(0x157)](tryShowWindow, -0x2 * -0x728 + 0x2 * 0x748 + -0x3 * 0x99f);
        },
        'openCustomPage'() {
            const _0x26c504 = _0x2840a7, _0xdfad99 = {
                    'gvhaS': function (_0xcfbdb1, _0x563e01) {
                        return _0xcfbdb1(_0x563e01);
                    }
                };
            if (unloaded)
                return;
            _0xdfad99[_0x26c504(0x171)](tryShowWindow, -0x1 * -0x1b47 + 0xb1b + -0x20 * 0x133);
        }
    }
};
function focusNode(_0x2e964d, _0x545b7c) {
    const _0x28a4bb = _0x2840a7, _0x55a3a2 = { 'myixl': _0x28a4bb(0x1a3) };
    let _0x2757c3 = Editor[_0x28a4bb(0x18a)][_0x28a4bb(0x156) + 'd'](_0x55a3a2[_0x28a4bb(0x1b6)]);
    Editor[_0x28a4bb(0x18a)][_0x28a4bb(0x189)](_0x55a3a2[_0x28a4bb(0x1b6)], _0x2757c3), Editor[_0x28a4bb(0x18a)][_0x28a4bb(0x1a6)](_0x55a3a2[_0x28a4bb(0x1b6)], _0x545b7c);
}
function focusAsset(_0x439bcb, _0x25f6cf) {
    const _0x1e93b5 = _0x2840a7, _0x58c263 = {
            'UZZBo': _0x1e93b5(0x1b1) + _0x1e93b5(0x141),
            'DODdQ': _0x1e93b5(0x1b3)
        };
    Editor[_0x1e93b5(0x13c)][_0x1e93b5(0x1a9)](_0x58c263[_0x1e93b5(0x191)], _0x25f6cf);
    let _0x15be6d = Editor[_0x1e93b5(0x18a)][_0x1e93b5(0x156) + 'd'](_0x58c263[_0x1e93b5(0x154)]);
    Editor[_0x1e93b5(0x18a)][_0x1e93b5(0x189)](_0x58c263[_0x1e93b5(0x154)], _0x15be6d), Editor[_0x1e93b5(0x18a)][_0x1e93b5(0x1a6)](_0x58c263[_0x1e93b5(0x154)], _0x25f6cf);
}
async function showWindow() {
    const _0x2b9c43 = _0x2840a7, _0x1f4b24 = {
            'TbEcZ': function (_0x1679d2) {
                return _0x1679d2();
            },
            'JRKlY': _0x2b9c43(0x165) + _0x2b9c43(0x1ac) + _0x2b9c43(0x187),
            'FBtrE': function (_0x18c39b, _0x359a07) {
                return _0x18c39b + _0x359a07;
            },
            'AKdBB': _0x2b9c43(0x180) + _0x2b9c43(0x179),
            'snVnG': _0x2b9c43(0x174),
            'yZFvX': _0x2b9c43(0x162),
            'gaNkZ': _0x2b9c43(0x177) + _0x2b9c43(0x1bc),
            'JUJoQ': _0x2b9c43(0x152),
            'cKjIJ': function (_0x258020, _0x4aebae) {
                return _0x258020 >= _0x4aebae;
            },
            'DDKRq': _0x2b9c43(0x175),
            'Sytti': _0x2b9c43(0x142),
            'OvdQh': function (_0x18d778, _0x2a3794) {
                return _0x18d778 + _0x2a3794;
            },
            'aCQwC': function (_0x4e4ad7, _0x37df93) {
                return _0x4e4ad7 + _0x37df93;
            },
            'HyJGj': _0x2b9c43(0x14e),
            'osFJh': _0x2b9c43(0x18d)
        };
    if (win) {
        win[_0x2b9c43(0x18e)](), win[_0x2b9c43(0x17d) + 's'][_0x2b9c43(0x1b0) + _0x2b9c43(0x17c)](_0x2b9c43(0x164) + _0x2b9c43(0x1a5) + mode + ')');
        return;
    }
    win = new BrowserWindow({
        'width': dw,
        'height': dh,
        'title': _0x1f4b24[_0x2b9c43(0x1ad)](_0x1f4b24[_0x2b9c43(0x166)], PKG_VERSION),
        'backgroundColor': _0x1f4b24[_0x2b9c43(0x194)],
        'useContentSize': !![],
        'autoHideMenuBar': !![],
        'webPreferences': {
            'enablePreferredSizeMode': !![],
            'preferredSizeMode': !![],
            'webviewTag': !![],
            'nodeIntegration': !![],
            'nodeIntegrationInSubFrames': !![],
            'enableRemoteModule': !![],
            'sandbox': ![],
            'devTools': devTools,
            'contextIsolation': ![],
            'webSecurity': !disableWebSec,
            'preload': path[_0x2b9c43(0x184)](__dirname, folder + (_0x2b9c43(0x1a4) + _0x2b9c43(0x176)))
        }
    });
    try {
        win[_0x2b9c43(0x16a)](null), win[_0x2b9c43(0x15d) + _0x2b9c43(0x16d)](![]), win[_0x2b9c43(0x15d) + _0x2b9c43(0x16d)] = win[_0x2b9c43(0x16a)] = function (_0x2f62be) {
        };
    } catch (_0x1dce86) {
    }
    win['on'](_0x1f4b24[_0x2b9c43(0x16f)], () => {
        const _0x15eda4 = _0x2b9c43;
        try {
            win[_0x15eda4(0x17d) + 's'][_0x15eda4(0x1b0) + _0x15eda4(0x17c)](_0x1f4b24[_0x15eda4(0x17e)])[_0x15eda4(0x1bb)](function (_0x1f99be) {
                const _0x378c99 = _0x15eda4;
                if (_0x1f99be)
                    config = _0x1f99be;
                _0x1f4b24[_0x378c99(0x168)](changeDWH);
            });
        } catch (_0x21c853) {
            Editor[_0x15eda4(0x1ae)](_0x21c853);
        }
    }), win['on'](_0x1f4b24[_0x2b9c43(0x16e)], () => win[_0x2b9c43(0x18e)]()), win['on'](_0x1f4b24[_0x2b9c43(0x140)], () => {
        const _0x57fd69 = _0x2b9c43;
        win[_0x57fd69(0x188)](), win = null;
        if (tray)
            tray[_0x57fd69(0x188)]();
        tray = null;
    });
    let _0x3d9ffb = folder + (_0x2b9c43(0x19b) + _0x2b9c43(0x1ba) + _0x2b9c43(0x198));
    _0x1f4b24[_0x2b9c43(0x185)](process[_0x2b9c43(0x153)][_0x2b9c43(0x151)][_0x2b9c43(0x14d)]('.')[-0x1a43 + 0x20e6 + 0x6a3 * -0x1], -0xb6b + -0x12cb + 0x1e3b) && (_0x3d9ffb = folder + _0x2b9c43(0x147));
    let _0x262ac8 = await Editor[_0x2b9c43(0x13c)][_0x2b9c43(0x181)](_0x1f4b24[_0x2b9c43(0x1bd)], _0x1f4b24[_0x2b9c43(0x143)]), _0x5cb804 = path[_0x2b9c43(0x184)](__dirname, _0x1f4b24[_0x2b9c43(0x1ad)](_0x1f4b24[_0x2b9c43(0x1ad)](_0x1f4b24[_0x2b9c43(0x155)](_0x1f4b24[_0x2b9c43(0x1b4)](_0x3d9ffb, _0x1f4b24[_0x2b9c43(0x19f)]), _0x262ac8), _0x1f4b24[_0x2b9c43(0x13f)]), mode));
    win[_0x2b9c43(0x190)](_0x2b9c43(0x1b5) + _0x5cb804);
}
function _0x2c60(_0x3f5e5a, _0x1b6f4e) {
    _0x3f5e5a = _0x3f5e5a - (0x1377 + 0x1a0e + -0x2c4a);
    let _0x41eab7 = _0x18b6[_0x3f5e5a];
    return _0x41eab7;
}
function tryShowWindow(_0x4d2e49) {
    const _0x78300b = _0x2840a7, _0x371774 = {
            'hLmrn': function (_0x63a090) {
                return _0x63a090();
            },
            'oXHqi': _0x78300b(0x170),
            'WUwuF': _0x78300b(0x1af),
            'HPjgm': _0x78300b(0x148) + _0x78300b(0x15b),
            'disRS': _0x78300b(0x19e) + _0x78300b(0x16c)
        };
    try {
        let _0x2dc2ec = nativeImage[_0x78300b(0x145) + _0x78300b(0x1a7)](path[_0x78300b(0x184)](__dirname, _0x371774[_0x78300b(0x16b)]));
        _0x2dc2ec = _0x2dc2ec[_0x78300b(0x162)]({
            'width': 0x10,
            'height': 0x10
        });
        tray && tray[_0x78300b(0x1a1)](_0x2dc2ec);
        if (!tray) {
            tray = new Tray(_0x2dc2ec), tray['on'](_0x371774[_0x78300b(0x18c)], function () {
                const _0x59d1e9 = _0x78300b;
                win[_0x59d1e9(0x18e)]();
            });
            let _0x538b62 = new Menu();
            _0x538b62[_0x78300b(0x19c)](new MenuItem({
                'label': _0x371774[_0x78300b(0x199)],
                'click': function () {
                    const _0x49c7f8 = _0x78300b;
                    win && (win[_0x49c7f8(0x17d) + 's'][_0x49c7f8(0x1b0) + _0x49c7f8(0x17c)](_0x49c7f8(0x167) + _0x49c7f8(0x186) + _0x49c7f8(0x14c)), config[_0x49c7f8(0x14f)] = !config[_0x49c7f8(0x14f)], _0x371774[_0x49c7f8(0x19a)](changeDWH));
                }
            })), tray[_0x78300b(0x1b8) + _0x78300b(0x1a0)](_0x538b62);
        } else {
            if (devTools)
                console[_0x78300b(0x15c)](_0x371774[_0x78300b(0x193)]);
        }
    } catch (_0x135e8f) {
        if (devTools)
            console[_0x78300b(0x1ae)](_0x135e8f);
    }
    mode = _0x4d2e49;
    try {
        _0x371774[_0x78300b(0x19a)](showWindow);
    } catch (_0x3979de) {
        console[_0x78300b(0x1ae)](_0x3979de);
    }
}