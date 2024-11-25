const mongoose = require('mongoose');
const Role = require('../models/Role');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
    
    // Create default roles if they don't exist
    const roles = [
      {
        name: 'admin',
        permissions: ['create', 'read', 'update', 'delete', 'manage_users'],
        description: 'Full system access'
      },
      {
        name: 'editor',
        permissions: ['create', 'read', 'update'],
        description: 'Can create and modify content'
      },
      {
        name: 'viewer',
        permissions: ['read'],
        description: 'Read-only access'
      }
    ];

    for (const role of roles) {
      await Role.findOneAndUpdate(
        { name: role.name },
        role,
        { upsert: true }
      );
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
