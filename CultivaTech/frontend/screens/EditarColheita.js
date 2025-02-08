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

export default function EditarColheita({ navigation, route }) {
  // Extrai o id da colheita a ser editada
  const { harvestId } = route.params;

  // Dados simulados das colheitas cadastradas (substitua por sua fonte de dados)
  const harvests = [
    {
      id: 1,
      quality: 4,
      harvestDate: "10/01/2025",
      measurementType: "Área",
      harvestAmount: "100",
      harvestCost: "R$ 500,00",
      saleValue: "R$ 1000,00",
    },
    {
      id: 2,
      quality: 3,
      harvestDate: "12/01/2025",
      measurementType: "Quantidade",
      harvestAmount: "200",
      harvestCost: "R$ 800,00",
      saleValue: "R$ 1500,00",
    },
    // Outros registros podem ser adicionados aqui
  ];

  // Busca a colheita com base no id recebido
  const harvestToEdit = harvests.find((item) => item.id === harvestId);

  // Inicializa os estados com os valores existentes ou com valores padrão
  const [quality, setQuality] = useState(
    harvestToEdit ? harvestToEdit.quality : 0
  );
  const [harvestDate, setHarvestDate] = useState(
    harvestToEdit ? harvestToEdit.harvestDate : ""
  );
  const [measurementType, setMeasurementType] = useState(
    harvestToEdit ? harvestToEdit.measurementType : "Área"
  );
  const [harvestAmount, setHarvestAmount] = useState(
    harvestToEdit ? harvestToEdit.harvestAmount : ""
  );
  const [harvestCost, setHarvestCost] = useState(
    harvestToEdit ? harvestToEdit.harvestCost : ""
  );
  const [saleValue, setSaleValue] = useState(
    harvestToEdit ? harvestToEdit.saleValue : ""
  );

  const getRatingColor = (i) => {
    switch (i) {
      case 1:
        return "#FF0000"; // vermelho
      case 2:
        return "#FF7F00"; // laranja
      case 3:
        return "#FFFF00"; // amarelo
      case 4:
        return "#7FFF00"; // verde claro
      case 5:
        return "#00FF00"; // verde
      default:
        return "#ccc";
    }
  };

  const isFormValid = () => {
    return (
      quality > 0 &&
      harvestDate &&
      harvestAmount &&
      harvestCost &&
      saleValue
    );
  };

  const handleSave = () => {
    if (!isFormValid()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Colheita atualizada com sucesso!");
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Colheita",
      "Tem certeza que deseja excluir esta colheita?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            Alert.alert("Sucesso", "Colheita excluída com sucesso!");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho com imagem */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/colheita.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.header}>Editar Colheita</Text>
      </View>

      {/* Seleção de Qualidade */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Qualidade:</Text>
        <View style={styles.qualityContainer}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.qualityCircle,
                quality >= i && { backgroundColor: getRatingColor(i) },
              ]}
              onPress={() => setQuality(i)}
            >
              <Text
                style={[
                  styles.qualityText,
                  quality >= i && styles.qualityTextSelected,
                ]}
              >
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data da Colheita */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="calendar"
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Data da Colheita (DD/MM/AAAA)"
          placeholderTextColor="#000"
          value={harvestDate}
          onChangeText={setHarvestDate}
        />
      </View>

      {/* Tipo de Medida: Área ou Quantidade */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Medida:</Text>
        <View style={styles.measurementContainer}>
          <TouchableOpacity
            style={[
              styles.measurementButton,
              measurementType === "Área" && styles.selectedMeasurementButton,
            ]}
            onPress={() => setMeasurementType("Área")}
          >
            <Text
              style={[
                styles.measurementText,
                measurementType === "Área" && styles.selectedMeasurementText,
              ]}
            >
              Área
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.measurementButton,
              measurementType === "Quantidade" &&
                styles.selectedMeasurementButton,
            ]}
            onPress={() => setMeasurementType("Quantidade")}
          >
            <Text
              style={[
                styles.measurementText,
                measurementType === "Quantidade" &&
                  styles.selectedMeasurementText,
              ]}
            >
              Quantidade
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Área/Quantidade Colhida */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="stats-chart"
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={
            measurementType === "Área" ? "Área Colhida" : "Quantidade Colhida"
          }
          placeholderTextColor="#000"
          value={harvestAmount}
          onChangeText={setHarvestAmount}
          keyboardType="numeric"
        />
      </View>

      {/* Custo da Colheita */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="cash"
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Custo da Colheita (R$)"
          placeholderTextColor="#000"
          value={harvestCost}
          onChangeText={setHarvestCost}
          keyboardType="numeric"
        />
      </View>

      {/* Valor da Venda */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="cash"
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor da Venda (R$)"
          placeholderTextColor="#000"
          value={saleValue}
          onChangeText={setSaleValue}
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

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir Colheita</Text>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  qualityContainer: {
    flexDirection: "row",
  },
  qualityCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  qualityText: {
    fontSize: 16,
    color: "#000",
  },
  qualityTextSelected: {
    color: "#fff",
  },
  measurementContainer: {
    flexDirection: "row",
  },
  measurementButton: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  selectedMeasurementButton: {
    backgroundColor: "#4CAF50",
  },
  measurementText: {
    fontSize: 16,
    color: "#000",
  },
  selectedMeasurementText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  },
});
