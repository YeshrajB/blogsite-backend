const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');

const signToken = ({ userId, role }) => {
    const secret = process.env.SECRET_KEY;
    if(!secret) throw new Error('Missing secret key');
    return jwt.sign({ id: userId, role }, secret, { expiresIn: '3h' });
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne( { $or: [{ username: email }, { email }] });

        if (!user || !user.isActive) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = signToken({ userId: user._id, role: user.role });

        res.status(200).json({ accessToken: token, user: {
            id: user._id,
            name: user.username,
            bio: user.about,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        } });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message });
    }
};

exports.signup = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const user = await User.create({ username, email, password, role });

        const roleData = await Role.findOne({ name: role });

        if (!roleData) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // user.permissions = roleData.permissions;

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
