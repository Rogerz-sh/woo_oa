const express = require('express');
const router = express.Router();
const tools = require('../utils');

router.use(tools.auth.authenticate)

router.get('/json-menu-list', (req, res) => {
    let uid = req.body.uid;
    res.json(tools.handler.success({
        uid: uid,
        menus: [
            {
                name: '常规分类',
                items: [
                    { url: '', text: '人才库' },
                    { url: '', text: '面试中' },
                    { url: '', text: '已入职' }
                ]
            },
            {
                name: '我的收藏',
                items: [
                    { url: '', text: '985' },
                    { url: '', text: '有意向' },
                    { url: '', text: '暂不考虑' }
                ]
            }
        ]
    }));
});

module.exports = router;