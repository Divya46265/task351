const mongoose = require('mongoose');
const User = require('./models/User');
const Role = require('./models/Role');
require('dotenv').config();

const verifyUserSetup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const user = await User.findOne({ email: 'admin@example.com' }).populate('role');
    console.log('User:', user);

    if (!user) {
      console.error('User not found');
    } else if (!user.isActive) {
      console.error('User is inactive');
    } else if (!user.role) {
      console.error('User has no role assigned');
    } else {
      console.log('User and role are set up correctly:', user.role);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error checking user setup:', error);
    mongoose.connection.close();
  }
};

verifyUserSetup();
