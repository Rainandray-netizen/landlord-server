var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../../controllers/reviews')

router.get('/', reviewsCtrl.getAll)
router.get('/:id', reviewsCtrl.getOne)

router.post('/', reviewsCtrl.create)

router.delete('/:id', reviewsCtrl.delete)

module.exports = router