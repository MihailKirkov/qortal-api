const express = require('express');
const router = express.Router();
const { handleSubscription } = require('../controllers/subscribeController');

router.post('/', handleSubscription);

module.exports = router;
