const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getToken, isAuth } = require('../utils');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
//get user
router.get('/', isAuth, async function (req, res) {
  //find user by findBYId using req.user in which we used token to get th user and
  // /select is used if user find by id return user without password to client
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
//register user 

const schema = Joi.object()
  .keys({
    name: Joi.string().min(6).required().messages({
      'string.empty': ` Name cannot be an empty field`,
      'string.min': ` Name should have a minimum length of {#limit}`,//change made {#limit} to ${limit}
      'any.required': ` Name is a required field`,
    }),
    email: Joi.string().min(8).max(50).required().email(),
    password: Joi.string()
      .min(6)
      .required()
      .max(20)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
      .messages({
        'string.pattern.base': 'password should have one special character',
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of {#limit}`,
        'string.max': `password should have a maximum length of {#limit}`,
        'any.required': `password is a required field`,
      }),
  })
  .options({ abortEarly: false });
//jsonweb token
/*function generateAccessToken(id) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1800s',
    }
  );
}*/
router.post('/register', async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      errors: error.details.filter((v) => v.message),
    });
  }
  const { name, email, password} = req.body;
  try {
    let user = await User.findOne({ email });
    //check if user exist
    if (user) {
      return res.status(400).json({
        errors: [
          {
            message: 'User already exist',
            context: {
              label: 'exist',
            },
          },
        ],
      });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      id: user.id,
      isAdmin: user.isAdmin,
    };
    jwt.sign(
      payload,
      config.get('TOKEN_SECRET'), 
      { expiresIn: '1800s' },
      function (err, token) {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
    // const token = generateAccessToken({ id: user._id, isAdmin: user.isAdmin });
    //res.json({ token: token });
    //  const newUser = await user.save();
    /*if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isadmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).json({ msg: 'Invalid User Data' });
    }*/
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
//Login user

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  try {
    let signinUser = await User.findOne({
      email,
    });
    if (!signinUser) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    //compare password see if email and password matches
    const isMatch = await bcrypt.compare(password, signinUser.password);
    if (!isMatch && !signinUser.isAdmin) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const payload = {
      id: signinUser.id,
      isAdmin: signinUser.isAdmin,
    };

    jwt.sign(
      payload,
      config.get('TOKEN_SECRET'),
      { expiresIn: '1800s' },
      function (err, token) {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );

    /*  if (signinUser) {
      const token = generateAccessToken({
        id: signinUser._id,
        isAdmin: signinUser.isAdmin,
      });
      res.json({ token: token });
       res.send({
        //  _id: signinUser.id,
        //name: signinUser.name,
        //email: signinUser.email,
        //isadmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }*/
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
//admin
router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({ 
      name: 'Aniket Arora',
      email: 'aniketarora568@gmail.com',
      password: 'Aniket1@',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error'); 
  }
});
module.exports = router;
