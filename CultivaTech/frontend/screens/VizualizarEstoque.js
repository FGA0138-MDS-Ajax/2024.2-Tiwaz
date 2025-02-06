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
import {getProdutosEstoque, excluirProdutoEstoque} from "../services/estoque";

export default function GerenciarEstoque({ navigation }) {
  const [estoque, setEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  const fetchEstoque = async () => {
    setLoading(true);
    try {
      const data = await getProdutosEstoque();
      setEstoque(data);
    } catch (error) {
      console.error("Erro ao buscar produtos no estoque", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstoque();
  }, []);

  const handleDelete = async () => {
    try {
      await excluirProdutoEstoque(selectedItemId);
      fetchEstoque();
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao excluir produto do estoque", error);
    }
  }

  const openModal = (id) => {
    setSelectedItemId(id);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {estoque.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nomeDoProduto}</Text>
            <View style={styles.itemDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Quantidade: </Text>
                  {item.quantidadeProdutoEstoque} {item.unidadeMedida}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Validade: </Text>
                  {item.dataValidade}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Custo: </Text>
                  {item.custoProduto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Data da Compra: </Text>
                  {item.dataCompraProduto}
                </Text>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CadastroEstoque", {
                  produto: {
                    ...item,
                    valorProduto: item.custoProduto,
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
        onPress={() => navigation.navigate("CadastroEstoque")}
      >
        <Text style={styles.newItemButtonText}>Cadastrar Novo Item</Text>
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
