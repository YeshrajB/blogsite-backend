const User = require('../models/user');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {
    try {
        //Bug: name is not updated due to key being different
        //Todo create custom update object to update all the fields
        const post = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.status(200).json({ users: users.map((u) => ({
            id: u._id,
            name: u.username,
            bio: u.about,
            email: u.email,
            role: u.role,
            isActive: u.isActive
        }))})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { updateUser, getUsers }