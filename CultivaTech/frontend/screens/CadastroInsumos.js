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

export default function AdicionarInsumo({ navigation }) {
  const insumosDisponiveis = [
    { id: 1, nome: "Adubo NPK", medida: "Kg" },
    { id: 2, nome: "Fertilizante Foliar", medida: "L" },
    { id: 3, nome: "Calcário", medida: "Kg" },
  ];

  const [insumoSelecionado, setInsumoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");

  const isFormValid = () => {
    return insumoSelecionado && nome && unidadeSelecionada && quantidade && valor;
  };

  const handleSave = () => {
    if (isFormValid()) {
      Alert.alert("Sucesso", "Insumo adicionado com sucesso!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Preencha todos os campos antes de salvar!");
    }
  };

  const handleCheckboxChange = (unidade) => {
    setUnidadeSelecionada(unidade);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/Insumos.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.header}>Adicionar Insumo</Text>
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="search" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Selecione o Insumo do Estoque"
          placeholderTextColor="#000"
          value={insumoSelecionado}
          onChangeText={setInsumoSelecionado}
        />
      </View>

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
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
});
