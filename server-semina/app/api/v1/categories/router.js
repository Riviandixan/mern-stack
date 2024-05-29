const express = require('express');
const router = express();
const {
  create,
  index,
  find,
  update,
  destory
} = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/categories', authenticateUser, authorizeRoles('organizer'), index);
router.post('/categories', authenticateUser, authorizeRoles('organizer'), create);
router.get('/categories/:id', authenticateUser, authorizeRoles('organizer'), find);
router.put('/categories/:id', authenticateUser, authorizeRoles('organizer'), update);
router.delete('/categories/:id', authorizeRoles('organizer'), destory);

module.exports = router;