const User = require('../models/userModel');
//login user
const loginUser = async (req, res) => {
    res.json({message: 'login user'});
}

//register user
const registerUser = async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    try {
        const user = await User.signup(firstName, lastName, phone, email, password);

        res.status(200).json({user});
    }catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    loginUser,
    registerUser
}
