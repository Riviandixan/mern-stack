const express = require('express');
const router = express();
const {
  createCMSOrganizer,
  createCMSUser,
  getCMSUsers,
} = require('./controller');
const {
  authenticateUser,
  authorizeRoles
} = require('../../../middlewares/auth');

router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCMSOrganizer);
router.get('/users', authenticateUser, authorizeRoles('organizer'), getCMSUsers);
router.post('/users', authenticateUser, authorizeRoles('organizer'), createCMSUser);

module.exports = router;