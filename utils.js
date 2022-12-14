const jwt = require('jsonwebtoken');

const config = require('config');
/*const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );
};
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    //changed onlytoken to token
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: 'Token is not supplied' });
  }
};
const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin Token is not valid' });
};
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
  //console.log(process.env.JWT_SECRET);
};
*/
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token);
  if (token) {
    const onlyToken = token.slice(7, token.length);//change from process.env.JWT_SECRET to config .get
    jwt.verify(onlyToken, config.get('JWT_SECRET'), (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      console.log(req.user);
      //console.log(req.user.user.Admin);
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
  // console.log(process.env.JWT_SECRET);
};

const isAdmin = (req, res, next) => {
  //console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};
module.exports = { isAuth, isAdmin };




/*mongoURI="mongodb+srv://Aniket123:Aniket123@cluster0.sggzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
JWT_SECRET=somethingSECRET
TOKEN_SECRET=somethingSECRET
BRAINTREE_MERCHANT_ID=53hr7rgwqktxwmrs
BRAINTREE_PUBLIC_KEY=6qjjhts245nwb6gz
BRAINTREE_PRIVATE_KEY=c8e67ccc668fa84d49a3d12d0cb402b6


*/