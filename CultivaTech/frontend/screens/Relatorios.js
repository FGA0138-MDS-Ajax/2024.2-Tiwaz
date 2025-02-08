import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

export default function RelatorioPlantacao({ navigation }) {
  const [idPlantacao, setIdPlantacao] = useState("");

  const handleGerarRelatorio = async () => {
    if (!idPlantacao) {
      Alert.alert("Erro", "Informe o ID da plantação para gerar o relatório.");
      return;
    }

    try {
      const response = await axios.get(`http://10.0.2.2:3000/relatorios/${idPlantacao}`);
      const { filePath } = response.data;
      Alert.alert("Sucesso", `Relatório gerado! Baixe em: ${filePath}`);
    } catch (error) {
      Alert.alert("Erro", "Falha ao gerar o relatório. Verifique o ID.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/fundo2.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.header}>Relatório de Plantação</Text>

      <View style={styles.inputGroup}>
        <Ionicons name="document-text" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="ID da Plantação"
          placeholderTextColor="#000"
          value={idPlantacao}
          onChangeText={setIdPlantacao}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleGerarRelatorio}>
          <Text style={styles.saveButtonText}>Gerar Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Voltar</Text>
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
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
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
    color: "#000",
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
});