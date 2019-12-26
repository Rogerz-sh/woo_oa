/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const {
    User,
    Resume,
    ResumeWork,
    ResumeEducation,
    ResumeRecord,
    Favorite,
    FavResume
} = require('../models/all');

async function testQuery() {
    return await Resume.findAll({
        include: [
            { model: User, as: 'creator' },
            { model: ResumeWork, as: 'works' },
            { model: ResumeEducation, as: 'educations' },
            { model: ResumeRecord, as: 'records' },
        ]
    })
}

async function testSave() {
    return await FavResume.create({
        userId: 1,
        resumeId: 5,
        favoriteId: 5
    })
}

testSave().then(result => {
    console.log(result)
}).catch(err => {
    console.log(err);
})

// testQuery().then(result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err);
// })