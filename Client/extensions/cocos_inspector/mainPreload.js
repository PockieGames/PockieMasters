const _0x58e1 = [
    'ync',
    'config.jso',
    '312863hhQHxq',
    'join',
    'stringify',
    'existsSync',
    'onfig.json',
    '1485BnjxJz',
    'utf-8',
    '419735nZaszv',
    'WQBkU',
    '2hcYAOe',
    '71726edfBIB',
    '696631CAxJre',
    '1XqCAAY',
    '79jcyyIn',
    'parse',
    '1484560dBKtdE',
    '1lixOfz',
    'lgibl',
    'nspector-c',
    'readConfig',
    '113216zFDuAU',
    '../cocos-i',
    'path',
    'saveConfig',
    'readFileSy',
    'writeFileS'
];
function _0x4983(_0x10ba29, _0x1b07bd) {
    _0x10ba29 = _0x10ba29 - (0x5d * -0x2c + -0x9 * -0x31b + 0xa54 * -0x1);
    let _0x40bd93 = _0x58e1[_0x10ba29];
    return _0x40bd93;
}
const _0x5c1af0 = _0x4983;
(function (_0x19a649, _0x44e45e) {
    const _0xdf4dcb = _0x4983;
    while (!![]) {
        try {
            const _0x4bd517 = -parseInt(_0xdf4dcb(0x1af)) * parseInt(_0xdf4dcb(0x1a7)) + -parseInt(_0xdf4dcb(0x1a6)) + -parseInt(_0xdf4dcb(0x1a5)) * -parseInt(_0xdf4dcb(0x1ab)) + -parseInt(_0xdf4dcb(0x1a8)) * parseInt(_0xdf4dcb(0x1bc)) + parseInt(_0xdf4dcb(0x1be)) + parseInt(_0xdf4dcb(0x1a4)) * -parseInt(_0xdf4dcb(0x1b7)) + parseInt(_0xdf4dcb(0x1aa));
            if (_0x4bd517 === _0x44e45e)
                break;
            else
                _0x19a649['push'](_0x19a649['shift']());
        } catch (_0x5cffe2) {
            _0x19a649['push'](_0x19a649['shift']());
        }
    }
}(_0x58e1, 0xbf * -0x295 + 0xe * 0xb93 + 0x3dfff * 0x2));
let fs = require('fs'), path = require(_0x5c1af0(0x1b1)), _configPath = path[_0x5c1af0(0x1b8)](__dirname, _0x5c1af0(0x1b6) + 'n'), __parentConfig = path[_0x5c1af0(0x1b8)](__dirname, _0x5c1af0(0x1b0) + _0x5c1af0(0x1ad) + _0x5c1af0(0x1bb));
global[_0x5c1af0(0x1ae)] = () => {
    const _0x192536 = _0x5c1af0, _0x336046 = { 'lgibl': _0x192536(0x1bd) };
    let _0x571243 = '';
    return fs[_0x192536(0x1ba)](__parentConfig) ? _0x571243 = fs[_0x192536(0x1b3) + 'nc'](__parentConfig, { 'encoding': _0x336046[_0x192536(0x1ac)] }) : _0x571243 = fs[_0x192536(0x1b3) + 'nc'](_configPath, { 'encoding': _0x336046[_0x192536(0x1ac)] }), JSON[_0x192536(0x1a9)](_0x571243);
}, global[_0x5c1af0(0x1b2)] = _0x3db169 => {
    const _0x145962 = _0x5c1af0, _0x26f1be = { 'WQBkU': _0x145962(0x1bd) };
    let _0x591757 = JSON[_0x145962(0x1b9)](_0x3db169);
    fs[_0x145962(0x1b4) + _0x145962(0x1b5)](__parentConfig, _0x591757, { 'encoding': _0x26f1be[_0x145962(0x1a3)] });
};