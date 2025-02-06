import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import {getCustos, deleteCusto} from "../services/custos"; // Importando as funcoes de listar e excluir custos

export default function GerenciarCustos({ navigation }) {
  const [custos, setCustos] = useState([]); // Estado para armazenar os valores dos custos
  const [loading, setLoading] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal (confirmacao de exclusao)
  const [selectedId, setSelectedId] = useState(null); // Estado para armazenar o id do item selecionado

  const fetchCustos = async () => { // Funcao para buscar os custos
    setLoading(true);
    try {
      const data = await getCustos();
      setCustos(data); // Atualiza o estado com os custos da API
    } catch (error) {
      console.error("Erro ao buscar custos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { // Hook de efeito para buscar os custos
    fetchCustos();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteCusto(selectedId); // Faz o DELETE na API
      fetchCustos(); // Recarrega a lista após exclusão
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao excluir custo:", error);
    }
  };

  const openModal = (id) => { // Funcao para abrir o modal de confirmacao de exclusao
    setSelectedId(id);
    setModalVisible(true);
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {custos.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nomeDoCusto}</Text>
            <View style={styles.itemDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Data: </Text>
                  {item.dataDoCusto}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Tipo: </Text>
                  {item.tipoDoCusto}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Descrição: </Text>
                  {item.descricaoDoCusto}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Valor: </Text>
                  {item.valorDoCusto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CadastroCusto", { 
                  custo: {
                    ...item,
                    valorCusto: item.valorDoCusto.toString(),
                  },
                  })}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => openModal(item.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Text style={styles.actionButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir este custo?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.newItemButton}
        onPress={() => navigation.navigate("CadastroCusto")}
      >
        <Text style={styles.newItemButtonText}>Cadastrar Novo Custo</Text>
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
  itemContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  itemDetails: {
    marginTop: 5,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#000",
  },
  boldText: {
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#439D46",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#D9D9D9",
  },
  deleteButton: {
    backgroundColor: "#F42310",
  },
  newItemButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#388E3C",
    paddingVertical: 15,
    borderRadius: 10,
    margin: 20,
  },
  newItemButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#388E3C",
  },
  confirmButton: {
    backgroundColor: "#F42310",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
