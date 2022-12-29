const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
}
//login user
const loginUser = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({email,token});
    }catch (error) {
        res.status(400).json({message: error.message});
    }
}

//register user
const registerUser = async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    try {
        const user = await User.signup(firstName, lastName, phone, email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({firstName,lastName,phone,email, token});
    }catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    loginUser,
    registerUser
}
