const User = require('../models/user_schema');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = async (req, res) => {
    // Validate user input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // Check if email is taken
    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) {
        return res.status(400).send('Email already exists.')
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        surname: req.body.surname,
        department: req.body.department,
        university: req.body.university,
        position: req.body.position,
        password: hashPassword,
        role: 'User'
    })

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err)
    }
}


// User login
const loginUser = async (req, res) => {
    // Validate user input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).send('Incorrect Email');
    };

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(401).send('Incorrect password');
    };
    // @ts-ignore
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.cookie('auth_token', token, {httpOnly: true});
    res.send('Login successful');
}

// User logout
const logoutUser = async (req, res) => {
    res.clearCookie('auth_token');
    res.send('Logout successful');
}

// Create new user (for admins in dashboard)
const createUser = async (req, res) => {
    // Validate user input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // Check if email is taken
    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) {
        return res.status(400).send('Email already exists.')
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        surname: req.body.surname,
        department: req.body.department,
        university: req.body.university,
        position: req.body.position,
        password: hashPassword,
        role: req.body.role
    })

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err)
    }
}

// Gets all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Gets one user by their id 
const getOneUser = async (req, res) => {
    try {
        const oneuser = await User.findById(req.params.id);
        res.status(200).json(oneuser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const removeUser = await User.deleteOne({ _id: req.params.id});
        return res.status(200).json({
            message: 'User deleted',
            data: removeUser,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Håkon oblig 2
// Updates user information to admin specification, based on email
const updateUser = async (req, res) => {
    try {
        const upUser = await
            User.updateOne({ email: req.params.email }, {
                $set: {
                    first_name: req.body.first_name,
                    surname: req.body.surname,
                    department: req.body.department,
                    university: req.body.university,
                    position: req.body.position,
                    role: req.body.role
                }
            });
        res.json(upUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// update user role  id
const updateUserRole = async (req, res) => {
    try {
        const upUser = await
            User.updateOne({ _id: req.params.id }, {
                $set: {
                    role: req.body.role
                }
            });
        res.json(upUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


module.exports = { loginUser, registerUser, logoutUser, createUser, getAllUsers, getOneUser, deleteUser, updateUser, updateUserRole };