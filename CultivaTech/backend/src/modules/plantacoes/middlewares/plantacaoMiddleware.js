const validarPlantacao = (req, res, next) => {
    const { nome, tipo, area, dataPlantio } = req.body;
  
    if (!nome || !tipo || !area || !dataPlantio) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }
  
    next();
  };
  
  module.exports = {
    validarPlantacao,
  };
  
  app.use(express.json());
