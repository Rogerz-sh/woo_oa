/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Sequelize = require('sequelize');
const {
    User,
    Resume,
    ResumeWork,
    ResumeEducation,
    ResumeRecord,
    Favorite,
    FavResume,
    sequelize
} = require('../models/all');

async function testQuery() {
    let result = await Resume.findAndCountAll({
        attributes: [
            'id', 'realname',
            [
                sequelize.literal("(select count(*) from fav_resumes where resume.id = fav_resumes.resumeId and userId = 1)"),
                'favcount'
            ]
        ]
    });
    return result;
}

async function testSave() {
    return await FavResume.create({
        userId: 1,
        resumeId: 5,
        favoriteId: 5
    })
}

// testSave().then(result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err);
// })

testQuery().then(result => {
    console.log(result)
}).catch(err => {
    console.log(err);
})