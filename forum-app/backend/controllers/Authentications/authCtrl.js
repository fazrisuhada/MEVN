import userMdl from "../../models/userMdl.js";
import jwt from "jsonwebtoken";

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

export const login = async(req,res) => {
    res.send('you are login')
}

export const register = async(req, res) => {   
    try{
        const { username, email, password } = req.body;
        const createUser = await userMdl.create({
            username,
            email,
            password
        })

        createToken(createUser, 201, res, 'Registration successful.')
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const logout = async(req, res) => {
    res.send('you are logout');
}

export const profile = async(req, res) => {
    res.send('you are profile');
}