var express = require('express');
var router = express.Router();
const landlordCtrl = require('../../controllers/landlords')

router.get('/', landlordCtrl.getAll)
router.get('/:id', landlordCtrl.getOne)

router.post('/', landlordCtrl.create )
router.delete('/:id', landlordCtrl.delete)

module.exports = router