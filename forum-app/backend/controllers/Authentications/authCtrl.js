import userMdl from "../../models/userMdl.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../../middlewares/asyncHandler.js";

const signToken = id =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED
    })
}

// buat token dan simpan di cookie
const createToken = (user, statusCode, response, message) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRED) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    response.cookie('jwt', token, cookieOptions)

    const {password, ...userWithoutSensitiveInfo} = user.toJSON()

    response.status(statusCode).json({
        success: true,
        message: message,
        // token,
        data: {
            user: userWithoutSensitiveInfo
        }
    })
}

// Fungsi untuk login user
export const login = asyncHandler(async (req, res) => {
    // Cek apakah email dan password diisi
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email or password is required.'
        });
    }

    // Cari user berdasarkan email
    const user = await userMdl.findOne({ email });

    // Jika user ditemukan dan password cocok
    if (user && await user.comparePassword(password)) {
        // Buat token dan kirim response sukses
        createToken(user, 200, res, 'Login successful.');
    } else {
        // Jika email atau password salah
        return res.status(401).json({
            success: false,
            message: 'Email or password is incorrect.'
        });
    }
});

// Fungsi untuk register user baru
export const register = asyncHandler(async (req, res) => {

    // Cek apakah user sudah ada
    const exsitingUser = (await userMdl.countDocuments()) === 0;
    // Set role
    const role = exsitingUser ? 'admin' : 'user';

    // Ambil data dari body
    const { username, email, password } = req.body;

    // Buat user baru di database
    const newUser = await userMdl.create({
        username,
        email,
        password,
        role
    });

    // Buat token dan kirim response sukses
    createToken(newUser, 201, res, 'Registration successful.');
});

export const logout = async(req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //hanya berlaku di production
        sameSite: 'strict',
        path: '/'
    }

    res.cookie('jwt', '', cookieOptions)

    res.status(200).json({
        success: true,
        message: 'You are logout.'
    })
}

export const profile = async(req, res) => {
    const user = await userMdl.findById(req.user.id).select({ password:0 });
    if(user) {
        return res.status(200).json({success: true, data: {user}});
    }
    return res.status(404).json({success: false, message: 'User not found.'});
}