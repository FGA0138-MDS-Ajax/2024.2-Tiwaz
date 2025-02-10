const request = require("supertest");
const app = require("../../../../server"); // Importa o app Express
const Plantacao = require("../models/Plantacao"); // Modelo Sequelize

describe("Fechar plantação", () => {
  let server;
  let plantacaoId;

  beforeAll(async () => {
    server = app.listen(3000); // Inicia o servidor na porta 3000

    // Criando uma plantação de teste no banco
    const plantacao = await Plantacao.create({
      nome: "Teste Plantação",
      tipo: "Cereal",
      areaPlantada: 10,
      dataPlantio: "2024-02-01",
      custoInicial: 5000,
      status: "Em Crescimento",
    });

    plantacaoId = plantacao.id;
  });

  it("Deve fechar a plantação corretamente", async () => {
    const response = await request(app)
      .patch(`/api/plantacoes/${plantacaoId}/fechar`) // ✅ Correção: backticks `` usados corretamente
      .send({ status: "Colhido" }); // ✅ Removido ";" que quebrava o encadeamento

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Plantação fechada com sucesso!");
  });

  it("Deve retornar erro 404 se a plantação não existir", async () => {
    const response = await request(app).patch("/api/plantacoes/999/fechar");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Plantação não encontrada!");
  });

  afterAll(async () => {
    // Removendo a plantação de teste
    await Plantacao.destroy({ where: { id: plantacaoId } });
    server.close(); // Fecha o servidor
  });
});
