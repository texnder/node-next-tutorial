const express = require('express');
const router = express.Router();
const { signup,signin, signout, requireSignin } = require('../controllers/auth');

// validators
const { runValidation } = require('../validators');
const { userSignupValidator, userValidator } = require('../validators/auth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userValidator, runValidation, signin);
router.get('/signout', signout);
router.get('/secret', requireSignin, (req,res)=> {
    res.json({
        message: 'secret page'
    })
});

module.exports = router;