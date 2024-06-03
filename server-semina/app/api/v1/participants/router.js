const express = require('express');
const router = express();
const {
    signup,
    signin,
    activeParticipant,
    getAllLandingPage,
    getDetailLandingPage,
    getAllPayment,
    getDashboard,
    checkout
} = require('./controller');
const { authenticateParticipant } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeParticipant);
router.get('/events', getAllLandingPage);
router.get('/events/:id', getDetailLandingPage);
router.get('/payments/:organizer', authenticateParticipant, getAllPayment);
router.get('/orders', authenticateParticipant, getDashboard);
router.get('/checkout', authenticateParticipant, checkout);

module.exports = router;