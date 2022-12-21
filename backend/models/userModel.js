const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

//static signup method
userSchema.statics.signup = async function (firstName, lastName, phone, email, password){

    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email,password: hash, firstName, lastName, phone });

    return user;

}

module.exports = mongoose.model('User', userSchema)