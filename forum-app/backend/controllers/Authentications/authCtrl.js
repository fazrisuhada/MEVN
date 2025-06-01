import userMdl from "../../models/userMdl.js"

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

        const response = {
            id: createUser._id,
            username: createUser.username,
            email: createUser.email,
            roel: createUser.role,
            createdAt: createUser.createdAt
        }

        return res.status(201).json({
            success: true,
            message: 'Registration successful.',
            data: response
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: err
        })
    }
}

export const logout = async(req, res) => {
    res.send('you are logout');
}

export const profile = async(req, res) => {
    res.send('you are profile');
}