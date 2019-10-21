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
                    { id: 1, url: '/page/dashboard', text: '人才库' },
                    { id: 2, url: '', text: '面试中' },
                    { id: 3, url: '', text: '已入职' }
                ]
            },
            {
                name: '我的收藏',
                items: [
                    { id: 4, url: '', text: '985' },
                    { id: 5, url: '', text: '有意向' },
                    { id: 6, url: '', text: '暂不考虑' }
                ]
            }
        ]
    }));
});

module.exports = router;