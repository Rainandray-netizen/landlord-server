const User = require('../models/user.model');
const Review = require('../models/review.model')
const jwt = require('jsonwebtoken');

async function signup(req, res) {
  const existingUser = await User.findOne({name: req.body.name})
  if(existingUser) return res.status(401).json({err: 'user exists dummy'})
  console.log('request body: ', req.body)
  const user = new User(req.body);
  try {
    await user.save();
    console.log('user saved: ', user)
    const token = createJWT(user)
    console.log('token created: ', token)
    res.json({token});
  } catch (err) {

    res.status(400).json(err);
  }
}

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    process.env.SECRET,
    {expiresIn: '24h'}
  );
}

async function login(req, res) {
  try {
    const user = await User.findOne({name: req.body.name});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

const profile = (req, res) => {
  User.findOne({name: req.params.username})
  .populate('reviews').exec((err, user)=> {
    Review.find(
      {_id:{$nin: user.reviews}},
      (err, popReviews) => {
        res.json({
          name: user.name,
          reviews: popReviews
        })
      }
    )
  })
}

// const profile = (req, res) => {
//   User.findOne({name: req.params.username }, (err, user) => {
//     if (err) return res.status(400).json(err);
//     console.log('USER HERE: ', user)
//     return res.json({
//       name: user.name,
//       reviews: user.reviews
//     })
//   })
// }

// Landlord.findById(req.params.id)
//   .populate('reviews').exec((err, landlord)=> {
//     Review.find(
//       {_id:{ $nin : landlord.reviews}},
//       (err, reviews) => {
//         console.log(reviews)
//         res.json({landlord, reviews})
//       }
//     )
//   })

module.exports = {
  signup,
  login,
  profile,
}