const express = require('express');
const router = express.Router();
const tools = require('../utils');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const JobType = require('../models/job_type')

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
                    // { id: 2, url: '', text: '面试中' },
                    // { id: 3, url: '', text: '已入职' }
                ]
            },
            {
                name: '我的收藏',
                items: [
                    // { id: 4, url: '', text: '985' },
                    // { id: 5, url: '', text: '有意向' },
                    // { id: 6, url: '', text: '暂不考虑' }
                ]
            }
        ]
    }));
});

router.get('/json-jobtype-list', (req, res) => {
    JobType.findAll().then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
})

router.post('/upload-file', (req, res) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../dist/upload");
    form.keepExtensions = true;//保留后缀
    form.parse(req, function (err, fields, files) {
        var filename = files.file.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes() + "_";
        var newName = time + name + '.' + type;
        var newPath = form.uploadDir + "/" + newName;
        fs.renameSync(files.file.path, newPath);  //重命名
        res.json(tools.handler.success({ filepath: "/upload/" + newName }));
    });
})

module.exports = router;