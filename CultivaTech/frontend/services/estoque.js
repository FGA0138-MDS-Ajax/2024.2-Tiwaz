import axios from "axios";

// Base URL do backend
const api = axios.create({
  baseURL: "http://10.0.2.2:3000/api/estoque", // Altere para o IP correto caso use dispositivo físico (localhost)
});


export const getProdutosEstoque = async () => { // Funcao que vai chamar a rota GET do backend para listar os produtos do estoque
  const response = await api.get("/");
  return response.data;
};


export const cadastrarProdutoEstoque = async (dados) => { // Funcao que vai chamar a rota POST do backend para cadastrar um novo produto no estoque
  const response = await api.post("/", dados);
  return response.data;
};


export const editarProdutoEstoque = async (id, dados) => { // Funcao que vai chamar a rota PUT do backend para atualizar um produto do estoque
  const response = await api.put(`/${id}`, dados);
  return response.data;
};


export const excluirProdutoEstoque = async (id) => { // Funcao que vai chamar a rota DELETE do backend para excluir um produto do estoque
  const response = await api.delete(`/${id}`);
  return response.data;
};
