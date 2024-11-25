require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Role = require('./models/Role');

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    const passwordHash = await bcrypt.hash('password', 10);
    
    const user = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      role: adminRole._id,
      isActive: true
    });

    await user.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close();
  }
};

createAdminUser();
