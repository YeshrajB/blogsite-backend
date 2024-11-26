const Role = require('../models/role');

const getRoles = async (req, res) => {
    try {
        const items = await Role.find().sort({ createdAt: -1 })
        res.status(200).json({ roles: items.map((r) => ({
            id: r._id,
            name: r.name,
            description: r.description,
            
        }))})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateRole = async (req, res) => {
    try {
        const r = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ role: r })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getRoles, updateRole }