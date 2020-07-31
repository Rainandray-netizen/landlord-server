const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
  landlordId: {type: Schema.Types.ObjectId, ref: 'Landlord'},
  reviewerId: {type: Schema.Types.ObjectId, ref: 'User'},
  rating: { type: Number, min: 1, max: 5 },
  content: { type: String },
  timestamp: { type: Date }
})

module.exports = model('Review', reviewSchema)