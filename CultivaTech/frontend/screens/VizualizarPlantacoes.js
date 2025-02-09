import React, { useState, useEffect  } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { listarPlantacoes, excluirPlantacao } from "../services/plantacoes";

export default function GerenciarPlantacoes({ navigation }) {
  const [plantacoes, setPlantacoes] = useState([]); // Estado inicial como array vazio
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

   // Função para buscar plantações do backend
   const fetchPlantacoes = async () => {
    setLoading(true);
    try {
      const response = await listarPlantacoes();
      setPlantacoes(response);
      console.log("Dados recebidos do backend:", response);
    } catch (error) {
      console.error("Erro ao listar plantações:", error);
      Alert.alert("Erro", "Não foi possível carregar as plantações.");
      setPlantacoes([]); // Evita undefined
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlantacoes();
  }, []);

  // Navega para a tela de visualização individual da plantação
  const navigateToVisualizacao = (plantacao) => {
    navigation.navigate("VizualizarPlantacaoIndividual", {
      plantacaoId: plantacao.id,
      plantacaoData: plantacao,
    });
  };

  // Função para editar: navega para uma tela de edição
  const handleEditar = (id) => {
    const plantacao = plantacoes.find((p) => p.idPlantacao === id);
    if (plantacao) {
      navigation.navigate("EditarPlantacao", { plantacao });
    }
  };

  // Função para fechamento: atualiza o status da plantação para "Fechado"
  const handleFechamento = (id) => {
    Alert.alert(
      "Fechamento",
      "Deseja fechar esta plantação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            setPlantacoes((prev) =>
              prev.map((p) =>
                p.idPlantacao === id ? { ...p, fechamento: "Fechado" } : p
              )
            );
            Alert.alert("Sucesso", "Plantação fechada com sucesso!");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleExcluir = async (id) => {
    Alert.alert(
      "Confirmação",
      "Deseja realmente excluir esta plantação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await excluirPlantacao(id);
              Alert.alert("Sucesso", "Plantação excluída com sucesso!");
              fetchPlantacoes(); // Atualiza a lista após exclusão
            } catch (error) {
              console.error("Erro ao excluir plantação:", error);
              Alert.alert("Erro", "Não foi possível excluir a plantação.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Função para gerar relatório: navega para uma tela de relatório
  const handleRelatorio = (id) => {
    navigation.navigate("Relatorios", { plantacaoId: id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {plantacoes.map((plantacoes) => (
          <View key={plantacoes.idPlantacao} style={styles.plantacaoContainer}>
            <View style={styles.plantacaoHeader}>
              <Text style={styles.plantacaoName}>{plantacoes.nome}</Text>
              <TouchableOpacity
                onPress={() => navigateToVisualizacao(plantacoes)}
                style={styles.visualizarButton}
              >
                <Ionicons name="eye" size={20} color="#388E3C" />
                <Text style={styles.visualizarText}>Visualizar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.plantacaoDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="leaf" size={20} color="#388E3C" />
                <Text style={styles.detailText}>Tipo: {plantacoes.tipoCultura}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="expand" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Área Plantada: {plantacoes.qtdPlantada} {plantacoes.unidadeMedida}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Data do Plantio: {plantacoes.dataPlantio}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="cash" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Custo Inicial: {plantacoes.custoInicial.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>
              </View>
              {plantacoes.fechamento && (
                <View style={styles.detailRow}>
                  <Ionicons name="information-circle" size={20} color="#1976D2" />
                  <Text style={styles.detailText}>Status: {plantacoes.fechamento}</Text>
                </View>
              )}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => handleEditar(plantacoes.idPlantacao)}
                style={styles.actionButton}
              >
                <Ionicons name="pencil" size={25} color="#388E3C" />
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFechamento(plantacoes.idPlantacao)}
                style={styles.actionButtonFechamento}
              >
                <Ionicons name="lock-closed" size={25} color="#FFCA28" />
                <Text style={styles.actionText}>Fechamento</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleExcluir(plantacoes.idPlantacao)}
                style={styles.actionButtonExcluir}
              >
                <Ionicons name="trash" size={25} color="#E53935" />
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRelatorio(plantacoes.idPlantacao)}
                style={styles.actionButtonRelatorio}
              >
                <Ionicons name="document-text" size={25} color="#1976D2" />
                <Text style={styles.actionText}>Relatório</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.newPlantacaoButton}
        onPress={() => navigation.navigate("CadastroPlantacao")}
      >
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.newPlantacaoButtonText}>
          Cadastrar Plantação
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    padding: 15,
  },
  plantacaoContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  plantacaoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plantacaoName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  visualizarButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  visualizarText: {
    fontSize: 16,
    color: "#388E3C",
    marginLeft: 5,
  },
  plantacaoDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: "#000",
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    flexWrap: "wrap",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
    marginVertical: 5,
  },
  actionButtonFechamento: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
    marginVertical: 5,
  },
  actionButtonExcluir: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
    marginVertical: 5,
  },
  actionButtonRelatorio: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
    marginVertical: 5,
  },
  actionText: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
    textAlign: "center",
  },
  newPlantacaoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#388E3C",
    paddingVertical: 15,
    borderRadius: 10,
    margin: 20,
  },
  newPlantacaoButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
