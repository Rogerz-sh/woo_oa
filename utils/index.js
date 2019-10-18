const crypto = require('crypto')
const { secretKey, appId } = require('../oa.config')

const handler = {
    success: function (result) {
        return { code: 200, results: result }
    },
    error: function (code = 101, msg = '程序出错了') {
        return { code, msg };
    }
}

const auth = {
    token: function (userId) {
        return crypto.createHmac('sha1', secretKey).update(appId + ':' + userId).digest('base64');
    },
    authenticate: function (req, res, next) {
        let userId = req.headers['oa-auth-uid'], token = req.headers['oa-auth-token'];
        if (crypto.createHmac('sha1', secretKey).update(appId + ':' + userId).digest('base64') === token) {
            next();
        } else {
            res.json(handler.error(401, '未授权或登录已超时'));
        }
    }
}

module.exports = {
    crypto,
    handler,
    auth
}