// Controller para relatórios de plantacao
const relatoriosService = require('../relatoriosService/relatoriosService');

const gerarRelatorioPlantacao = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = await relatoriosService.gerarRelatorioPDF(id);
    res.status(200).json({ message: 'Relatório gerado com sucesso!', filePath });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { gerarRelatorioPlantacao };