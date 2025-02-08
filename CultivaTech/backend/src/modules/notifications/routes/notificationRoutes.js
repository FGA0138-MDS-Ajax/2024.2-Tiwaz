const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

// Atualiza preferências de notificação
router.put('/preferences/:userId', NotificationController.updatePreferences);

// Rota de teste para enviar notificação
router.post('/test/:userId', NotificationController.testNotification);

module.exports = router;
