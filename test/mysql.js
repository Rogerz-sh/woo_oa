/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Sequelize = require('../models/db')
const User = require('../models/user');
const Group = require('../models/group')

execQuery().then(result => {
    console.log(result.toJSON());
}).catch(err => {
    console.log(err);
})

async function findUser() {
    return await User.findOne({
        include: [{
            model: Group,
            where: { id: Sequelize.col('user.id') }
        }]
    });
}

async function execQuery() {
    await User.update({username: 'roger.zhang@giewoo.com'}, {
        where: {
            id: 1
        }
    });
    return await User.findOne();
}