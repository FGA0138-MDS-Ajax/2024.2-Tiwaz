import axios from "axios";

// Base URL do backend
const api = axios.create({
  baseURL: "http://10.0.2.2:3000/api/plantacoes", 
});

// Buscar todas as plantações
export const listarPlantacao = async () => {
  try {
    const response = await api.get("/");
    return response.data
  } catch (error) {
    console.error("Erro ao buscar plantações:", error);
    throw error;
  }
};

// Cadastrar uma nova plantação
export const cadastrarPlantacao = async (dados) => {

  const response = await api.post("/", dados);
  return response.data;
}
// Atualizar uma plantação existente
export const atualizarPlantacao = async (id, dados) => {
  const response = await api.put(`/${id}`, dados)
  return response.data;
    };

// Excluir uma plantação
export const excluirPlantacao = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

// Buscar todas as plantações
export const listarPlantacoes = async () => {
  try {
  
    const response = await api.get(`/`);
  
    console.log("✅ Plantações carregadas:", response.data);
    return response.data; // Retorna apenas a lista de plantações
  } catch (error) {
    console.error("❌ Erro ao listar plantações:", error);
    return []; // Retorna array vazio em caso de erro
  }
};