const express = require('express');
const router = express.Router();
const tools = require('../utils');
const path = require('path');
const Resume = require('../models/resume')

router.get('/download', (req, res) => {
    let filepath = req.query.path, filename = req.query.name;
    if (filepath && filename) {
        let _path = path.join(__dirname + "/../dist" + filepath);
        res.download(_path, filename);
    } else {
        res.redirect('/error');
    }
})

router.use(tools.auth.authenticate)

router.get('/json-resume-list', (req, res) => {
    let offset = +req.query.offset, limit = +req.query.limit, query = JSON.parse(req.query.query), where = {};
    // query = JSON.parse(query);
    if (query.realname) {
        where['realname'] = { $like: `%${query.realname}%` }
    }
    if (query.sex) {
        where['sex'] = { $eq: query.sex }
    }
    if (query.degree) {
        where['degree'] = { $eq: query.degree }
    }
    if (query.company) {
        where['company'] = { $like: `%${query.company}%` }
    }
    if (query.job) {
        where['job'] = { $like: `%${query.job}%` }
    }
    Resume.findAndCountAll({ where: where, offset: offset, limit: limit }).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
});

router.post('/save-resume', (req, res) => {
    let resume = req.body.resume, id = resume.id;
    delete resume.id;
    if (id == 0) {
        Resume.create(resume).then(result => {
            res.json(tools.handler.success(result));
        }).catch(err => {
            res.json(tools.handler.error(101, err));
        })
    } else {
        Resume.update(resume, {
            where: {
                id: id
            }
        }).then((result) => {
            res.json(tools.handler.success(result));
        }).catch(err => {
            res.json(tools.handler.error(101, err));
        })
    }

})

module.exports = router;