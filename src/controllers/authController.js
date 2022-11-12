/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
const User = require('../models/userModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// User login and generate a token and cookie
module.exports.login = asyncHandler(async (req, res, done) => {
    const { username, email, password } = req.body

    if ((!!email && !!username) || (!email && !username)) {
        return res.status(400).json({ message: 'Username or email is required!' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required!' });
    }

    const user = await User.findOne(email ? { email } : { username }).exec();

    if (!user || !user.active) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const hashPwd = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_PASSWORD
    );
    const originPassword = hashPwd.toString(CryptoJS.enc.Utf8);

    if (originPassword !== password) {
        return res.status(401).send({ message: 'Wrong credentials!' });
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": user.username,
                "roles": user.roles
            }
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken });
})

// Refresh token because access token has expired
module.exports.refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized!' });

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden!' });

            const foundUser = await User.findOne({ username: decoded.username }).exec();

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized!' });

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '15m' }
            )

            res.json({ accessToken });
        })
    )
}

// User clear cookie if exists
module.exports.logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie cleared' });
}