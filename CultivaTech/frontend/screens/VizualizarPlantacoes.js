import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GerenciarPlantacoes({ navigation }) {
  const [plantacoes, setPlantacoes] = useState([
    {
      id: 1,
      name: "Milho Safrinha",
      type: "Grão",
      plantingDate: "10/01/2025",
      measure: "2 hectares",
      cost: "R$ 10.000,00",
    },
    {
      id: 2,
      name: "Tomate Cereja",
      type: "Hortaliça",
      plantingDate: "05/01/2025",
      measure: "5 hectares",
      cost: "R$ 20.000,00",
    },
    {
      id: 3,
      name: "Soja Convencional",
      type: "Grão",
      plantingDate: "08/01/2025",
      measure: "15 hectares",
      cost: "R$ 50.000,00",
    },
  ]);

  const handleAction = (action, id) => {
    console.log(`${action} da plantação com ID ${id}`);
  };

  const navigateToVisualizacao = (plantacao) => {
    navigation.navigate("VizualizarPlantacaoIndividual", {
      plantacaoId: plantacao.id,
      plantacaoData: plantacao,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {plantacoes.map((plantacao) => (
          <View key={plantacao.id} style={styles.plantacaoContainer}>
            <View style={styles.plantacaoHeader}>
              <Text style={styles.plantacaoName}>{plantacao.name}</Text>
              <TouchableOpacity
                onPress={() => navigateToVisualizacao(plantacao)}
                style={styles.visualizarButton}
              >
                <Ionicons name="eye" size={20} color="#388E3C" />
                <Text style={styles.visualizarText}>Visualizar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.plantacaoDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="leaf" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Tipo: {plantacao.type}
                  </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="expand" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Área Plantada: {plantacao.measure}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Data do Plantio: {plantacao.plantingDate}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="cash" size={20} color="#388E3C" />
                <Text style={styles.detailText}>
                  Custo Inicial: {plantacao.cost}
                </Text>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => handleAction("Editar", plantacao.id)}
                style={styles.actionButton}
              >
                <Ionicons name="pencil" size={25} color="#388E3C" />
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAction("Fechamento", plantacao.id)}
                style={styles.actionButtonFechamento}
              >
                <Ionicons name="lock-closed" size={25} color="#FFCA28" />
                <Text style={styles.actionText}>Fechamento</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAction("Excluir", plantacao.id)}
                style={styles.actionButtonExcluir}
              >
                <Ionicons name="trash" size={25} color="#E53935" />
                <Text style={styles.actionText}>Excluir</Text>
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
        <Text style={styles.newPlantacaoButtonText}>Cadastrar Plantação</Text>
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
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
  },
  actionButtonFechamento: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
  },
  actionButtonExcluir: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
  },
  actionText: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
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
