const express = require('express');
const router = express.Router();
const { register, login, logout, verifyAuth } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/verify', authMiddleware, verifyAuth);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });


module.exports = router;