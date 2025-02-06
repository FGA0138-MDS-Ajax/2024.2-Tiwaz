import axios from "axios";

// Base URL do backend
const api = axios.create({
  baseURL: "http://10.0.2.2:3000/api/custos", // Altere para o IP correto caso use dispositivo físico
});


export const getCustos = async () => { // Funcao que vai chamar a rota GET do backend para listar os custos
  const response = await api.get("/");
  return response.data;
};


export const cadastrarCusto = async (dados) => { // Funcao que vai chamar a rota POST do backend para cadastrar um novo custo
  const response = await api.post("/", dados);
  return response.data;
};


export const atualizarCusto = async (id, dados) => { // Funcao que vai chamar a rota PUT do backend para atualizar um custo
  const response = await api.put(`/${id}`, dados);
  return response.data;
};


export const deleteCusto = async (id) => { // Funcao que vai chamar a rota DELETE do backend para excluir um custo
  const response = await api.delete(`/${id}`);
  return response.data;
};
