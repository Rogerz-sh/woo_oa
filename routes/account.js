/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const tools = require('../utils');
const User = require('../models/user')

router.post('/account-login', async (req, res) => {
    let username = req.body.username, password = req.body.password;
    let user = await User.findOne({
        where: {
            username: username,
            password: tools.crypto.createHash('md5').update(password).digest('hex')
        }
    });
    if (user) {
        user = user.toJSON();
        let token = tools.auth.token(user.id);
        req.session.accountId = user.id;
        req.session.accountName = user.username;
        req.session.accountNickname = user.nickname;
        res.json(tools.handler.success(token))
    } else {
        res.json(tools.handler.error(101, '用户名或密码不正确'));
    }
})

module.exports = router;