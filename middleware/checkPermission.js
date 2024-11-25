const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const hasPermission = req.user.role.permissions.includes(requiredPermission);
      console.log('User Permissions:', req.user.role.permissions);
      console.log('Has Permission:', hasPermission);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('Permission Check Error:', error);
      res.status(500).json({ message: 'Error checking permissions' });
    }
  };
};

module.exports = checkPermission;
