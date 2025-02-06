import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import CheckBox from 'react-native-checkbox';
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function CadastroPlantacao({ navigation }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [isArea, setIsArea] = useState(true);
  const [isQuantidade, setIsQuantidade] = useState(false);
  const [areaPlantada, setAreaPlantada] = useState("");
  const [dataPlantio, setDataPlantio] = useState("");
  const [custoInicial, setCustoInicial] = useState("");

  const handleAreaChange = () => {
    setIsArea(true);
    setIsQuantidade(false);
  };

  const handleQuantidadeChange = () => {
    setIsArea(false);
    setIsQuantidade(true);
  };

  const isFormValid = () => {
    return nome && tipo && areaPlantada && dataPlantio && custoInicial;
  };

  const handleSave = () => {
    if (isFormValid()) {
      Alert.alert("Sucesso", "Plantio cadastrado com sucesso!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Preencha todos os campos antes de salvar!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/plantacao2.jpg")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.inputGroup}>
        <Ionicons name="leaf" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome da Plantação"
          placeholderTextColor="#000"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputGroup}>
        <FontAwesome5 name="seedling" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Cultura (ex: Milho, Soja)"
          placeholderTextColor="#000"
          value={tipo}
          onChangeText={setTipo}
        />
      </View>

      <View style={styles.checkboxGroup}>
        <Text style={styles.checkboxLabel}>Medida:</Text>
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxItem}>
            <CheckBox
              label="Área"
              checked={isArea}
              onChange={handleAreaChange}
              containerStyle={styles.checkboxContainer}
              labelStyle={styles.checkboxText}
            />
          </View>
          <View style={styles.checkboxItem}>
            <CheckBox
              label="Quantidade"
              checked={isQuantidade}
              onChange={handleQuantidadeChange}
              containerStyle={styles.checkboxContainer}
              labelStyle={styles.checkboxText}
            />
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="expand" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={isQuantidade ? "Quantidade Plantada" : "Área Plantada (hectares)"}
          placeholderTextColor="#000"
          value={areaPlantada}
          onChangeText={setAreaPlantada}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="calendar" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Data de Plantio (dd/mm/aaaa)"
          placeholderTextColor="#000"
          value={dataPlantio}
          onChangeText={setDataPlantio}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="cash" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Custo Inicial (R$)"
          placeholderTextColor="#000"
          value={custoInicial}
          onChangeText={setCustoInicial}
          keyboardType="numeric"
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
  checkboxGroup: {
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  checkboxText: {
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
