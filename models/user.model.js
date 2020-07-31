const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: { type: String },
  password: { type: String },
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = model('User', userSchema)