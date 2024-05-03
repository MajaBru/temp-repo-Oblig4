const User = require('../models/user_schema');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authtoken = req.headers['Authorization'];
    if (!authtoken || !authtoken.startsWith('Bearer')) {
        return res.status(401).send('Access denied');
    }
    try {
        const token = authtoken.split(' ')[1];
        // @ts-ignore
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = await User.findById(verified._id).select('-password');
        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send("You don't have permission for this");
        }
        next();
    }
}

const attachTokenToHeader = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    next();
  };

module.exports = { auth, authRole, attachTokenToHeader };