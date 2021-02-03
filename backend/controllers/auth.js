const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// secret key for jwt
const JWT_SECRET = 'ghjdfghghjfg';

exports.signup = (req, res) => {
    console.log(req.body);
    User.findOne({email: req.body.email}).exec((err,user) => {
        if(user){
            return res.status(400).json({
                error: 'email is taken'
            })
        };
    });

    const {name, email, password} = req.body;
    let username = shortId.generate();
    let profile = 'http://localhost:3000/profile/'+username;
    let newUser = new User({name, email, password, profile, username});
    newUser.save((err,success) => {
        if(err){
            return res.status(404).json({
                error: err
            })
        };
        // res.json({
        //     user: success
        // });
        res.json({
            message: 'Singup success! please signin'
        })
    })

};


exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email or password do not match.'
            });
        }
        
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
};

exports.signout = (req, res) =>{
    res.clearCookie('token');
    res.json({
        message: 'signout successfully'
    })
}


exports.requireSignin = expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });