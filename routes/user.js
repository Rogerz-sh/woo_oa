const express = require('express');
const router = express.Router();
const tools = require('../utils');
// const sequelize = require('../models/db');

const Favorite = require('../models/favorite')
const FavResume = require('../models/fav_resume')
router.use(tools.auth.authenticate)

router.get('/json-favorite-list', (req, res) => {
    let uid = req.get('oa-auth-uid');
    // sequelize.query('SELECT *, (SELECT COUNT(*) FROM fav_resumes WHERE fav_resumes.favoriteId = favorites.id) AS count FROM favorites WHERE userId = :uid ',
    //     { replacements: { uid: uid }, type: sequelize.QueryTypes.SELECT }
    // ).then(result => {
    //     res.json(tools.handler.success(result));
    // }).catch(err => {
    //     res.json(tools.handler.error(101, err));
    // });
    Favorite.findAll({
        where: {
            userId: uid
        }
    }).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    });
});

router.post('/save-favorite-item', (req, res) => {
    saveFavoriteItem(req).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })
})

async function saveFavoriteItem(req) {
    let uid = +req.get('oa-auth-uid'), fav = req.body.fav, id = fav.id, result;
    delete fav.editable;
    delete fav.id;
    delete fav.items;
    delete fav.count;
    fav.userId = uid;
    if (!id) {
        result = await Favorite.create(fav);
        id = result.id;
    } else {
        result = await Favorite.update(fav, {
            where: {
                id: id
            }
        });
    }
    return id;
}

router.post('/remove-favorite-item', (req, res) => {
    removeFavoriteItem(req).then(result => {
        res.json(tools.handler.success(result));
    }).catch(err => {
        res.json(tools.handler.error(101, err));
    })    
})

async function removeFavoriteItem(req) {
    let id = req.body.id;
    await FavResume.destroy({
        where: {
            favoriteId: id
        },
        force: true
    })
    await Favorite.destroy({
        where: {
            id: id
        },
        force: true
    })
    return 1;
}

module.exports = router;