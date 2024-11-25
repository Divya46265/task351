const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['admin', 'editor', 'viewer']
  },
  permissions: [{
    type: String,
    enum: ['create', 'read', 'update', 'delete', 'manage_users']
  }],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
