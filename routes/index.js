const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const checkPermission = require('../middleware/checkPermission');

router.post('/auth/login', authController.login);

router.get('/users', 
  authMiddleware, 
  checkPermission('manage_users'), 
  userController.getAllUsers
);

router.patch('/users/role',
  authMiddleware,
  checkPermission('manage_users'),
  userController.updateUserRole
);

module.exports = router;
