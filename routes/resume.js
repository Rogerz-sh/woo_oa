const express = require('express');
const router = express.Router();
const tools = require('../utils');
const Resume = require('../models/resume')

router.use(tools.auth.authenticate)

router.get('/json-resume-list', (req, res) => {
    Resume.findAndCountAll({ offset: 0, limit: 10 }).then(result => {
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