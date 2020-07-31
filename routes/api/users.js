var express = require('express');
var router = express.Router();
const usersCtrl = require('../../controllers/users');

/* GET users listing. */
router.get('/:username', usersCtrl.profile)

router.post('/signup', usersCtrl.signup)
router.post('/login', usersCtrl.login)

module.exports = router;
