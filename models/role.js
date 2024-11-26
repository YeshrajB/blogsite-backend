const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    permissions: {
        type: Array,
        required: false,
        default: []
    }
});

module.exports = mongoose.model('Role', RoleSchema);
