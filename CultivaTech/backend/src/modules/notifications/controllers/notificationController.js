const NotificationService = require('../services/notificationService');

class NotificationController {
    async updatePreferences(req, res) {
        try {
            const { userId } = req.params;
            const preferences = req.body;

            await NotificationService.updateNotificationPreferences(userId, preferences);

            res.status(200).json({ message: 'Preferências de notificação atualizadas com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar preferências:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async testNotification(req, res) {
        try {
            const { userId } = req.params;
            const { location } = req.body;

            await NotificationService.checkWeatherAndNotify(userId, location);

            res.status(200).json({ message: 'Notificação de teste enviada com sucesso' });
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async enviarNotificacao(req, res) {
        try {
            const { titulo, mensagem, dados } = req.body;
            await NotificationService.enviarNotificacao(titulo, mensagem, dados);
            res.status(200).json({ message: 'Notificação enviada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NotificationController();
