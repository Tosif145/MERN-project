import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "10d"});

    // Set JWT as an HTTP-only Cookie

    res.cookie("jwt", token , {
        httpOnly: true,
        sercure: process.env.NODE_ENV !== 'production',
        sameSite: 'strict',
        maxAge: 10 * 24 * 60 * 60 * 1000
    });

    return token;
}

export default generateToken;

