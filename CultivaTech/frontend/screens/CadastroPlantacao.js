import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, Alert, Image 
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { cadastrarPlantacao } from "../services/plantacaoService"; 

export default function CadastroPlantacao({ navigation }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [isArea, setIsArea] = useState(true);
  const [areaPlantada, setAreaPlantada] = useState("");
  const [dataPlantio, setDataPlantio] = useState("");
  const [custoInicial, setCustoInicial] = useState("");

  const handleCadastro = async () => {
    if (!nome || !tipo || !areaPlantada || !dataPlantio || !custoInicial) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
  
    try {
      const response = await cadastrarPlantacao({
        nome,
        tipo,
        areaPlantada: isArea ? areaPlantada : null,
        quantidadePlantada: !isArea ? areaPlantada : null,
        dataPlantio,
        custoInicial,
      });
  
      console.log("Resposta da API:", response);
  
      if (response.success && response.data?.id) {  // Verifica corretamente o ID retornado
        Alert.alert("Sucesso", "Plantação cadastrada com sucesso!");
        navigation.goBack();
      } else {
        console.warn("⚠️ Erro inesperado no cadastro:", response);
        Alert.alert("Erro", response.error || "Erro ao cadastrar a plantação.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a plantação.");
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
          <TouchableOpacity 
            style={[styles.checkboxItem, isArea && styles.checkboxItemSelected]} 
            onPress={() => setIsArea(true)}
          >
            <Ionicons name={isArea ? "checkbox" : "square-outline"} size={24} color="#4CAF50" />
            <Text style={styles.checkboxText}>Área (hectares)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.checkboxItem, !isArea && styles.checkboxItemSelected]} 
            onPress={() => setIsArea(false)}
          >
            <Ionicons name={!isArea ? "checkbox" : "square-outline"} size={24} color="#4CAF50" />
            <Text style={styles.checkboxText}>Quantidade</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="expand" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={isArea ? "Área Plantada (hectares)" : "Quantidade Plantada"}
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
        <TouchableOpacity style={styles.saveButton} onPress={handleCadastro}>
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
    justifyContent: "space-around",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  checkboxItemSelected: {
    backgroundColor: "#E0F2F1",
    borderRadius: 10,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
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
