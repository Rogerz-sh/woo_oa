/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Sequelize = require('../models/db')
// const User = require('../models/user');
// const Group = require('../models/group')

// execQuery().then(result => {
//     console.log(result.toJSON());
// }).catch(err => {
//     console.log(err);
// })

// async function findUser() {
//     return await User.findOne({
//         include: [{
//             model: Group,
//             where: { id: Sequelize.col('user.id') }
//         }]
//     });
// }

// async function execQuery() {
//     return await User.findOne({
//         where: {
//             username: 'rogers'
//         }
//     });
// }
const Resume = require('../models/resume');
Resume.create({
    realname: '莫凡',
    sex: '男',
    birthyear: '1982',
    province: '301',
    city: '30101',
    mobile: '18988889999',
    email: 'test@test.cn',
    industry: '0',
    jobclass: '9',
    company: '上海瑞凡企业管理有限公司',
    job: '运营经理',
    experience: '14',
    school: '中南财经政法大学',
    degree: '硕士',
    filepath: '',
    filename: ''
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})