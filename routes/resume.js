const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const tools = require('../utils');
const path = require('path');
const sequelize = require('../models/db');

const User = require('../models/user')
const Resume = require('../models/resume')
const ResumeRecord = require('../models/resume_record')
const ResumeWork = require('../models/resume_work')
const ResumeEducation = require('../models/resume_education')
// const Favorite = require('../models/favorite')
// const FavResume = require('../models/fav_resume')

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

router.get('/json-resume-list', async (req, res) => {
    try {
        let uid = req.get('oa-auth-uid'), offset = +req.query.offset, limit = +req.query.limit, query = JSON.parse(req.query.query), where = {};
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
        let result = await sequelize.query('SELECT *, (SELECT COUNT(id) FROM fav_resumes WHERE fav_resumes.resumeId = resumes.id AND fav_resumes.userId = :userId) AS count FROM resumes WHERE deletedAt is NULL LIMIT :offset,:limit',
            { replacements: { userId: uid, offset, limit }, type: sequelize.QueryTypes.SELECT }
        );
        let count = await Resume.count({
            where: where
        })
        res.json(tools.handler.success({ 'count': count, 'rows': result }));

    } catch (err) {
        res.json(tools.handler.error(101, err));
    }

});

router.get('/json-resume-works-and-edcations', (req, res) => {
    let resumeId = req.query.resumeId;
    getWorksAndEducations(resumeId).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
});

async function getWorksAndEducations(resumeId) {
    let resume = await Resume.findOne({
        where: { id: resumeId }
    });
    let works = await ResumeWork.findAll({
        where: { resumeId: resumeId }
    });
    let educations = await ResumeEducation.findAll({
        where: { resumeId: resumeId }
    });
    return { resume: resume, works: works, educations: educations };
}

router.post('/save-resume', (req, res) => {
    saveResume(req).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
})

async function saveResume(req) {
    let resume = req.body.resume, id = resume.id, works = resume.works, educations = resume.educations, result;
    delete resume.id;
    delete resume.works;
    delete resume.educations;
    if (id == 0) {
        result = await Resume.create(resume);
        id = result.id;
    } else {
        result = await Resume.update(resume, {
            where: {
                id: id
            }
        })
    }
    await ResumeWork.destroy({
        where: {
            resumeId: id
        },
        force: true
    });
    for (let i = 0; i < works.length; i++) {
        let work = works[i];
        work.resumeId = id;
        delete work.id;
        await ResumeWork.create(work);
    }
    await ResumeEducation.destroy({
        where: {
            resumeId: id
        },
        force: true
    });
    for (let i = 0; i < educations.length; i++) {
        let education = educations[i];
        education.resumeId = id;
        delete education.id;
        await ResumeEducation.create(education);
    }
    return id;
}

router.post('/save-resume-by-chrome', (req, res) => {
    saveResumeByChrome(req).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
})

async function saveResumeByChrome(req) {
    let resume = typeof (req.body.resume) == 'string' ? JSON.parse(req.body.resume) : req.body.resume, works = resume.works, educations = resume.educations, result, id;
    delete resume.id;
    delete resume.works;
    delete resume.educations;
    let exist = await Resume.findOne({
        where: {
            mobile: resume.mobile
        }
    })
    if (exist) {
        return Promise.reject('手机号码已被录入');
    } else {
        result = await Resume.create(resume);
        id = result.id;
    }
    await ResumeWork.destroy({
        where: {
            resumeId: id
        },
        force: true
    });
    for (let i = 0; i < works.length; i++) {
        let work = works[i];
        work.resumeId = id;
        delete work.id;
        await ResumeWork.create(work);
    }
    await ResumeEducation.destroy({
        where: {
            resumeId: id
        },
        force: true
    });
    for (let i = 0; i < educations.length; i++) {
        let education = educations[i];
        education.resumeId = id;
        delete education.id;
        await ResumeEducation.create(education);
    }
    return id;
}

router.post('/remove-resume', (req, res) => {
    let resumeId = req.body.resumeId;
    Resume.destroy({
        where: {
            id: resumeId
        }
    }).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    });
})

router.get('/json-resume-record-list', (req, res) => {
    let resumeId = req.query.resumeId;
    ResumeRecord.findAll({
        where: {
            resumeId: resumeId
        },
        include: [
            {
                model: User,
                where: { id: { $eq: Sequelize.col('resume_record.createdBy') } }
            }
        ]
    }).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
})

router.post('/save-resume-record', (req, res) => {
    let record = req.body.record;
    ResumeRecord.create(record).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    });
})

module.exports = router;