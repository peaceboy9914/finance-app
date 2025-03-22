const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

exports.registerUser = async (req, res) => {
    const {name, email, password, profilePicUrl} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message: "Please provide all fields"});
    }

    const alreadyExist = await User.findOne({email})
    if(alreadyExist) {
        return res.status(400).json({message: "user already exists"});
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePic: profilePicUrl,
        });
        res.status(201).json({
            message: "User created successfully",
            user: user,
            token: generateToken(user._id),
        })
    } catch(error) {
        res.status(500).json({message: "Something went wrong during registration"});
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        if(!email || !password) {
            return res.status(400).json({message: "Please provide all fields"});
        }

        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message: "Invalid credentials"});
        }
    
        res.status(200).json({
            message: "Login successful",
            user,
            token: generateToken(user._id),
        });
    } catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }

};

exports.getUserInfo = async (req, res) => {};