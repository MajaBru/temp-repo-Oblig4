const router = require('express').Router();
const { check } = require('express-validator');
const { registerUser, loginUser, logoutUser, createUser, getAllUsers, getOneUser, updateUser, deleteUser, updateUserRole} = require('../controller/user_controller');
const { auth, authRole, attachTokenToHeader } = require('./verifyToken.js');

// Register new account 
router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({min:8})
], registerUser)

// Login to account
router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({min:8})
], loginUser);

// Logout from account
router.get('/logout', logoutUser);

// Create new user on admin dashboard
router.post('/', [
    check('email').isEmail(),
    check('password').isLength({min:8})
], attachTokenToHeader, auth, authRole('Admin'), createUser)

// Gets all users
router.get("/", getAllUsers);

// Finds a user by their id
router.get("/:id", attachTokenToHeader, auth, authRole('Admin'), getOneUser);

// Update a user
router.put("/:email", attachTokenToHeader, auth, authRole('Admin'), updateUser);

// Update a user role
router.put("/role/:id", attachTokenToHeader , auth, authRole('Admin'), updateUserRole);

// Delete a user
router.delete("/:id", attachTokenToHeader, auth, authRole('Admin'), deleteUser);
module.exports = router;