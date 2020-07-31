const { Schema, model } = require('mongoose')

const landlordSchema = new Schema({
  name: { type : String },
  propertyAddress: { type : String },
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = model('Landlord', landlordSchema)