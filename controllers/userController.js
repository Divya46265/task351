const User = require('../models/User');
const Role = require('../models/Role');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('role').select('-password');
      console.log('Fetched Users:',users);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const { userId, roleId } = req.body;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      user.role = roleId;
      await user.save();

      res.json({ message: 'User role updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user role' });
    }
  }
};

module.exports = userController;
