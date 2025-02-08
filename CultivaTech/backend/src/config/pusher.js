const Pusher = require('pusher');

// Configuração do Pusher diretamente no código
const CONFIG = {
    PUSHER: {
        INSTANCE_ID: "d0218b62-2ceb-4944-80c1-59fe56f60fa8",
        PRIMARY_KEY: "026EA79509199BD4E27F41428F611685336A2A5708ACC95E8469ADECABBA0D84"  // Coloque sua Primary Key aqui
    }
};

const pusher = new Pusher({
    instanceId: CONFIG.PUSHER.INSTANCE_ID,
    secretKey: CONFIG.PUSHER.PRIMARY_KEY
});

module.exports = pusher; 