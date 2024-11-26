const rolePermissions = {
    'admin': ['create', 'view', 'update', 'delete'],
    'editor': ['create', 'view', 'update'],
    'moderator': ['create', 'view', 'update'],
    'premium-user': ['create', 'view', 'update'],
    'user': ['create', 'view'],
    'guest': ['view']
}

module.exports = rolePermissions