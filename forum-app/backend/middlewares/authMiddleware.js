// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import db from '../models/index.js'; // Sekarang mengimpor dari index.js

export const authLogin = async (req, res, next) => {
    // 1. fungsi jika di header kita masukan token atau tidak
    let token;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1]
    // }    

    token = req.cookies.jwt;
    
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'You are not login.'
        });
    }
    // console.log(token)

    // 2. decode verifikasi token
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }

    // 3. ambil data user yang login
    const currentUser = await db.UserMdl.findById(decoded.id); // Menggunakan findById untuk MongoDB
    // console.log(currentUser);

    if (!currentUser) {
        return res.status(401).json({
            success: false,
            message: 'User not found or no longer active.'
        });
    }

    req.user = currentUser;
    next();
};

export const authorize = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(res.status(403).json({
                success: false,
                message: 'You are not allowed to access this route.'
            }))
        }
        next();
    }
}