const Landlord = require('../models/landlord.model');
const Review = require('../models/review.model')

const getAll = (req, res) => {
  Landlord.find({}, (err, allLandlords)=> {
    if (err) return res.status('400').json({ 'err' : 'landlords could not be gotten' })
    res.json(allLandlords)
  })
}

const getOne = (req, res) => {
  Landlord.findById(req.params.id)
  .populate('reviews').exec((err, landlord)=> {
    Review.find(
      {_id:{ $nin : landlord.reviews}},
      (err, popReviews) => {
        console.log(popReviews)
        landlord.reviews = popReviews
        res.json(landlord)
      }
    )
  })
}

const create = (req, res) => {
  const newLandlord = new Landlord(req.body)
  newLandlord.save()
  res.json(newLandlord)
}

const deleteOne = (req, res) => {
  Landlord.findByIdAndDelete(req.params.id, (err, deletedLandlord) => {
    if (err) return res.status('400').json(err)
    res.json('classicide complete')
  })

}

module.exports = {
  getAll,
  getOne,
  create,
  delete:deleteOne,
}