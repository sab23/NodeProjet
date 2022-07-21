// Import
const express = require('express');
const messageController = require('../controllers/message');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/message', isAuth, messageController.sendMessage);
router.get('/messages', isAuth, messageController.getMessages);

module.exports = router;
