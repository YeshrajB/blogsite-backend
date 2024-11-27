const mongoose = require('mongoose');

const rolePermissions = {
    'admin': ['create', 'view', 'update', 'delete'],
    'editor': ['create', 'view', 'update'],
    'moderator': ['create', 'view', 'update'],
    'premium-user': ['create', 'view', 'update'],
    'user': ['create', 'view'],
    'guest': ['view']
}


const PermissionSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
    },
    resource: {
        type: String,
        required: true,
    },
}, { 
    timestamps: true,
    validate: {
        validator: async function(value) {
            const existingPermission = await Permission.findOne({ action: value.action, resource: value.resource });
            return !existingPermission;
        },
        message: 'The combination of action and resource must be unique.'
    }
});

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = { rolePermissions, Permission }