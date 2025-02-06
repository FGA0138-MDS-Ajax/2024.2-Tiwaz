import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from 'react-native-checkbox';
import {cadastrarProdutoEstoque, editarProdutoEstoque} from "../services/estoque";

export default function CadastroEstoque({ route, navigation }) {
  const produtoExistente = route.params?.produto;

  const formatDateForBackend = (date) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = date.match(regex);
    if (match) {
      const [, day, month, year] = match;
      return `${day}/${month}/${year}`;
    }
    return null; // Retorna null se a data for inválida
  };


  const [nomeDoProduto, setNomeDoProduto] = useState(produtoExistente?.nomeDoProduto || "");
  const [dataValidade, setDataValidade] = useState(produtoExistente?.dataValidade || "");
  const [unidadeMedida, setUnidadeMedida] = useState(produtoExistente?.unidadeMedida || ""); // Novo estado para armazenar a unidade selecionada
  const [quantidadeProdutoEstoque, setQuantidadeProdutoEstoque] = useState(produtoExistente?.quantidadeProdutoEstoque ? String(produtoExistente.quantidadeProdutoEstoque) : "");
  const [custoProduto, setCustoProduto] = useState(produtoExistente?.custoProduto ? String(produtoExistente.quantidadeProdutoEstoque) : "");
  const [dataCompraProduto, setDataCompraProduto] = useState(produtoExistente?.dataCompraProduto || "");


  const isFormValid = () => {
    return nomeDoProduto && unidadeMedida && quantidadeProdutoEstoque && custoProduto && dataCompraProduto;
  };
  
  const handleSave = async () => {
    if (!isFormValid()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const dataFormatadaValidade = formatDateForBackend(dataValidade);
    if (!dataFormatadaValidade) {
      Alert.alert("Erro", "Por favor, insira uma data de vencimento válida no formato DD/MM/AAAA.");
      return;
    }
  
    const dataFormatadaCompra = formatDateForBackend(dataCompraProduto);
    if (!dataFormatadaCompra) {
      Alert.alert("Erro", "Por favor, insira uma data de compra válida no formato DD/MM/AAAA.");
      return;
    }

    const dados = {
      nomeDoProduto,
      dataValidade: dataFormatadaValidade,
      unidadeMedida,
      quantidadeProdutoEstoque: parseFloat(quantidadeProdutoEstoque),
      custoProduto: parseFloat(custoProduto),
      dataCompraProduto: dataFormatadaCompra,
    };

    try {
      if (produtoExistente) {
        await editarProdutoEstoque(produtoExistente.id, dados);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        await cadastrarProdutoEstoque(dados);
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      }
      navigation.navigate("VizualizarEstoque", { reload: true });

    } catch (error) {
      console.error("Erro ao salvar produto no estoque", error.response?.data || error.message);
      Alert.alert("Erro", error.response?.data?.error || "Erro ao salvar produto no estoque");
    }
  };

  const handleCheckboxChange = (unidade) => {
    setUnidadeMedida(unidade); // Altera a unidade selecionada
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/estoque.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.inputGroup}>
        <Ionicons name="cube" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          placeholderTextColor="#000"
          value={nomeDoProduto}
          onChangeText={setNomeDoProduto}
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="document-text" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Validade (DD/MM/AAAA)"
          placeholderTextColor="#000"
          value={dataValidade}
          onChangeText={setDataValidade}
        />
      </View>

      <Text style={styles.subHeader}>Selecione a Unidade de Medida:</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="g"
            checked={unidadeMedida === "g"}
            onChange={() => handleCheckboxChange("g")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="Kg"
            checked={unidadeMedida === "Kg"}
            onChange={() => handleCheckboxChange("Kg")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="Ml"
            checked={unidadeMedida === "Ml"}
            onChange={() => handleCheckboxChange("Ml")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
        <View style={styles.checkboxGroup}>
          <CheckBox
            label="L"
            checked={unidadeMedida === "L"}
            onChange={() => handleCheckboxChange("L")}
            containerStyle={styles.checkboxContainerStyle}
            labelStyle={styles.checkboxLabel}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="stats-chart" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder= {`Quantidade (${unidadeMedida})`}
          placeholderTextColor="#000"
          value={quantidadeProdutoEstoque}
          onChangeText={setQuantidadeProdutoEstoque}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="cash" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Custo do Produto"
          placeholderTextColor="#000"
          value={custoProduto}
          onChangeText={setCustoProduto}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="calendar" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Data da Compra (DD/MM/AAAA)"
          placeholderTextColor="#000"
          value={dataCompraProduto}
          onChangeText={setDataCompraProduto}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  subHeader: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 10,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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
