const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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

    //validation
    if(!firstName || !lastName || !phone || !email || !password) {
        throw Error('All fields are required');
    }
    if(!validator.isEmail(email)) {
        throw Error('Invalid email');
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
    }
    if(!validator.isMobilePhone(phone)) {
        throw Error('Invalid phone number');
    }
    if(phone.length !== 10) {
        throw Error('Invalid phone number 10 digits required');
    }
    
    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email,password: hash, firstName, lastName, phone });

    return user;

}

//static login method
userSchema.statics.login = async function (email, password) {

    //validation
    if(!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({ email });

    if(!user) {
        throw Error('Invalid email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error('Invalid password');
    }

    return user;
}
module.exports = mongoose.model('User', userSchema)