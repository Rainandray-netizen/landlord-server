const Review = require('../models/review.model')
const Landlord = require('../models/landlord.model')
const User = require('../models/user.model')

// const getAll = (req, res) => {
//   Review.find({}, (err, allReviews)=> {
//     if (err) return res.status('400').json({ 'err' : 'Reviews could not be gotten' })
//     res.json(allReviews)
//   })
// }

const getAll = (req, res) => {
  Review.find({}).populate('landlordId').populate('reviewerId').exec((err,result)=>{
    res.json(result)
  })
}

const getOne = (req, res) => {
  Review.findById(req.params.id).exec((err,res)=>{
    if (err) return res.status('400').json(err)
    // if (!res.body) res.status('400').json('review no exist')
  })
  .populate('landlordId')
  .exec((err, res)=>{
    if (err) return res.status('400').json(err)
  })
  .populate('reviewerId')
  .exec((err, result)=>{
    if (err) return res.status('400').json(err)
    res.json(result)
  })
}

// const getOne = (req, res) => {
//   Review.findById(req.params.id, async (err, review) => {
//     res.json(review)
//   })
// }

const create = (req, res) => {
  newReview = new Review({
    landlordId: req.body.landlordId,
    reviewerId: req.body.reviewerId,
    content: req.body.content,
    rating: req.body.rating,
    timestamp: new Date()
  })
  newReview.save()

  console.log('NEW REVIEW: ', newReview)

  Landlord.findById(req.body.landlordId, (err, landlord) => {
    if (err) return res.status('400').json(err)
    landlord.reviews.push(newReview._id)
    landlord.save()
  })

  User.findById(req.body.reviewerId, (err, user) => {
    if (err) return res.status('400').json(err)
    user.reviews.push(newReview._id)
    user.save()
  })

  res.json(newReview)
}

const deleteOne = (req, res) => {
  Review.findByIdAndDelete(req.params.id, (err, deletedReview)=> {
    if (err) return res.status('400').json(err)
    res.json('review deleted')
  })
}

module.exports = {
  getAll,
  getOne,
  create,
  delete: deleteOne,
}