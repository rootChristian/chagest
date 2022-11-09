/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const CryptoJS = require('crypto-js');
const { isValidObjectId } = require('mongoose');

// Get all users from database
module.exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'Users not found!' })
    }

    res.json(users);
})

// Create a new user in the database
module.exports.createNewUser = asyncHandler(async (req, res) => {
    const { username, email, firstname, lastname, password, gender, roles, image, active } = req.body

    // Confirm data
    if (!username || !email || !firstname || !lastname || !password || !gender || !Array.isArray(roles) || !roles.length /*|| !image*/) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate username
    const duplicateUsername = await User.findOne({ username }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Username already exist!' });
    }

    // Check for duplicate email
    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Email already exist!' });
    }

    // Hash password 
    const hashPwd = await CryptoJS.AES.encrypt(
        password, process.env.SECRET_PASSWORD
    ).toString();

    let userObject = { username, email, firstname, lastname, "password": hashPwd, gender, roles, image };

    // Create and store new user 
    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
})

// Update a user in the database
module.exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.body//req.params.id;

    const { username, email, firstname, lastname, password, gender, roles, image, active } = req.body

    if (!isValidObjectId(id)) res.status(500).json({ message: 'Invalid ID: ' + id })

    // Confirm data 
    if (!id || !username || !email || !firstname || !lastname || !password || !gender || !Array.isArray(roles) || !roles.length || /*!image ||*/ typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check for duplicate 
    const duplicateUsername = await User.findOne({ username }).lean().exec();

    // Allow updates to the original user 
    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({ message: 'Username already exist!' });
    }

    // Check for duplicate 
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    // Allow updates to the original user 
    if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: 'Email already exist!' });
    }

    user.username = username
    user.email = email
    user.firstname = firstname
    user.lastname = lastname
    user.gender = gender
    user.roles = roles
    user.image = image
    user.active = active

    if (password) {
        // Hash password 
        user.password = await CryptoJS.AES.encrypt(
            password, process.env.SECRET_PASSWORD
        ).toString();
    }

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.username} updated` });
});

// Delete a user from database
module.exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!isValidObjectId(id)) res.status(500).json({ message: 'Invalid ID: ' + id })

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
});