import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "react-native-checkbox";

export default function EditarInsumo({ navigation, route }) {
  // Extrai o id do insumo a ser editado
  const { insumoId } = route.params;

  // Dados simulados dos insumos cadastrados (substitua por sua fonte de dados)
  const insumosCadastrados = [
    { id: 1, insumoSelecionado: "Adubo NPK", nome: "Adubo NPK", medida: "Kg", quantidade: "100", valor: "R$ 500,00", dataDeUso: "01/01/2025" },
    { id: 2, insumoSelecionado: "Fertilizante Foliar", nome: "Fertilizante Foliar", medida: "L", quantidade: "50", valor: "R$ 300,00", dataDeUso: "05/01/2025" },
    { id: 3, insumoSelecionado: "Calcário", nome: "Calcário", medida: "Kg", quantidade: "200", valor: "R$ 800,00", dataDeUso: "10/01/2025" },
  ];

  // Busca o insumo com base no id recebido
  const insumoToEdit = insumosCadastrados.find((item) => item.id === insumoId);

  // Inicializa os estados com os valores existentes ou com string vazia se não encontrado
  const [nome, setNome] = useState(insumoToEdit ? insumoToEdit.nome : "");
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(
    insumoToEdit ? insumoToEdit.medida : ""
  );
  const [quantidade, setQuantidade] = useState(
    insumoToEdit ? insumoToEdit.quantidade : ""
  );
  const [valor, setValor] = useState(insumoToEdit ? insumoToEdit.valor : "");
  const [dataDeUso, setDataDeUso] = useState(
    insumoToEdit && insumoToEdit.dataDeUso ? insumoToEdit.dataDeUso : ""
  );

  const isFormValid = () => {
    return nome && unidadeSelecionada && quantidade && valor && dataDeUso;
  };

  const handleSave = () => {
    if (isFormValid()) {
      Alert.alert("Sucesso", "Insumo atualizado com sucesso!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Preencha todos os campos antes de salvar!");
    }
  };

  const handleCheckboxChange = (unidade) => {
    setUnidadeSelecionada(unidade);
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Insumo",
      "Tem certeza que deseja excluir este insumo?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            Alert.alert("Sucesso", "Insumo excluído com sucesso!");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/Insumos.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.header}>Editar Insumo</Text>
      </View>

      {/* Container removido: Input de "Selecione o Insumo do Estoque" */}

      <View style={styles.inputGroup}>
        <Ionicons name="leaf" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome do Insumo"
          placeholderTextColor="#000"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <Text style={styles.subHeader}>Unidade de Medida:</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="g"
            checked={unidadeSelecionada === "g"}
            onChange={() => handleCheckboxChange("g")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="Kg"
            checked={unidadeSelecionada === "Kg"}
            onChange={() => handleCheckboxChange("Kg")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="Ml"
            checked={unidadeSelecionada === "Ml"}
            onChange={() => handleCheckboxChange("Ml")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="L"
            checked={unidadeSelecionada === "L"}
            onChange={() => handleCheckboxChange("L")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Ionicons
          name="stats-chart"
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={`Quantidade Utilizada (${unidadeSelecionada || "selecione a unidade"})`}
          placeholderTextColor="#000"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="cash" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Valor Total (R$)"
          placeholderTextColor="#000"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />
      </View>

      {/* Novo input para Data de Uso */}
      <View style={styles.inputGroup}>
        <Ionicons name="calendar" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Data de Uso (DD/MM/YYYY)"
          placeholderTextColor="#000"
          value={dataDeUso}
          onChangeText={setDataDeUso}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir Insumo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  subHeader: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF5252",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkboxGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainerStyle: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#FF5252",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
});
