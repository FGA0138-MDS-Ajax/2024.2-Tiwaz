const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Plantacao = require('../../plantacoes/models/Plantacao');

async function gerarRelatorioPDF(id) {
  // Busca a plantação específica pelo ID
  const plantacao = await Plantacao.findByPk(id);

  if (!plantacao) {
    throw new Error('Plantação não encontrada para gerar o relatório.');
  }

  return new Promise((resolve, reject) => {
    // Cria o documento PDF
    const doc = new PDFDocument();
    // Define o caminho do arquivo usando o módulo path
    const relatoriosDir = path.join(__dirname, '..', 'relatorios');
    
    if (!fs.existsSync(relatoriosDir)) {
        fs.mkdirSync(relatoriosDir, { recursive: true });
      }
      const filePath = path.join(relatoriosDir, `relatorio_plantacao_${id}_${Date.now()}.pdf`);
      const writeStream = fs.createWriteStream(filePath);
    
    // Encaminha o conteúdo do PDF para o arquivo
    doc.pipe(writeStream);

    // Adiciona o conteúdo ao PDF
    doc.fontSize(18)
       .text('Relatório de Plantação', { align: 'center' })
       .moveDown();

    doc.fontSize(12)
       .text(`Nome: ${plantacao.nome}`)
       .text(`Tipo: ${plantacao.tipo}`)
       .text(`Área Plantada: ${plantacao.areaPlantada || 'Não informado'}`)
       .text(`Quantidade Plantada: ${plantacao.quantidadePlantada || 'Não informado'}`)
       .text(`Data do Plantio: ${new Date(plantacao.dataPlantio).toLocaleDateString()}`);

    // Valida se o custoInicial está definido para evitar erro com toFixed
    const custoInicial = plantacao.custoInicial ? plantacao.custoInicial.toFixed(2) : 'Não informado';
    doc.text(`Custo Inicial: R$ ${custoInicial}`).moveDown();

    doc.end();

    // Aguarda o término da escrita do arquivo
    writeStream.on('finish', () => {
      resolve(filePath);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { gerarRelatorioPDF };
