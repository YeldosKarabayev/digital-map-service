const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' } // Только Access Token
    );

    res.json({ accessToken }); // Вернуть только Access Token
});


// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
// const refresh = (req, res) => {
//     const cookies = req.cookies

//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         asyncHandler(async (err, decoded) => {
//             if (err) {
//                 console.error('Ошибка Refresh Token:', err.message);
//                 return res.status(403).json({ message: 'Forbidden' });
//             }
    
//             const foundUser = await User.findOne({ username: decoded.username }).exec();
    
//             if (!foundUser) {
//                 console.error('Пользователь с Refresh Token не найден.');
//                 return res.status(401).json({ message: 'Unauthorized' });
//             }
    
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": foundUser.username,
//                         "roles": foundUser.roles
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '15m' }
//             );
    
//             console.log('Новый Access Token выдан:', accessToken);
//             res.json({ accessToken });
//         })
//     );
    
// }

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    res.sendStatus(204); // No content
};


module.exports = {
    login,
    logout
}