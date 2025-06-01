import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required.'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'must email format.'
        }
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err) {
        next(err);
    }
})

// Method untuk compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const userMdl = mongoose.model('User', userSchema);

export default userMdl;