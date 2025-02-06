import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import {cadastrarCusto, atualizarCusto} from "../services/custos";

export default function CadastrarCustos({ route, navigation }) {
  const custoExistente = route.params?.custo;

  const formatDateForBackend = (date) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = date.match(regex);
    if (match) {
      const [, day, month, year] = match;
      return `${day}/${month}/${year}`;
    }
    return null; // Retorna null se a data for inválida
  };


  const [nomeDoCusto, setNomeDoCusto] = useState(custoExistente?.nomeDoCusto || "");
  const [dataDoCusto, setDataDoCusto] = useState(custoExistente?.dataDoCusto || "");
  const [descricaoDoCusto, setDescricaoDoCusto] = useState(custoExistente?.descricaoDoCusto || "");
  const [valorDoCusto, setValorDoCusto] = useState(
    custoExistente?.valorDoCusto?.toString() || ""
  );

  const [open, setOpen] = useState(false);
  const [tipoDoCusto, setTipoDoCusto] = useState(custoExistente?.tipoDoCusto || null);
  const [items, setItems] = useState([
    { label: "Maquinário", value: "Maquinario" },
    { label: "Funcionários", value: "Funcionarios" },
    { label: "Outro", value: "Outro" },
  ]);


  const handleSave = async () => {
    if (!nomeDoCusto || !dataDoCusto || !tipoDoCusto || !descricaoDoCusto || !valorDoCusto) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const dataFormatada = formatDateForBackend(dataDoCusto);
    if (!dataFormatada) {
      Alert.alert("Erro", "Por favor, insira uma data válida no formato DD/MM/AAAA.");
      return;
    }

    const dados = {
      nomeDoCusto,
      dataDoCusto: dataFormatada,
      tipoDoCusto,
      descricaoDoCusto,
      valorDoCusto: parseFloat(valorDoCusto),
    };

    try {
      if (custoExistente) {
        await atualizarCusto(custoExistente.id, dados);
        Alert.alert("Sucesso", "Custo atualizado com sucesso!");
      } else {
        await cadastrarCusto(dados);
        Alert.alert("Sucesso", "Custo cadastrado com sucesso!");
      }
      navigation.navigate("VizualizarCustos", { reload: true });
    } catch (error) {
      console.error("Erro ao salvar custo:", error.response?.data || error.message);
      Alert.alert("Erro", error.response?.data?.error || "Não foi possível salvar o custo.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../assets/images/plantacao2.jpg")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.inputGroup}>
        <Ionicons name="cash-outline" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome do Custo"
          placeholderTextColor="#000"
          value={nomeDoCusto}
          onChangeText={setNomeDoCusto}
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="calendar-outline" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Data do Custo (DD/MM/AAAA)"
          placeholderTextColor="#000"
          value={dataDoCusto}
          onChangeText={setDataDoCusto}
        />
      </View>

      <Text style={styles.subHeader}>Tipo do Custo:</Text>
      <DropDownPicker
        open={open}
        value={tipoDoCusto}
        items={items}
        setOpen={setOpen}
        setValue={setTipoDoCusto}
        setItems={setItems}
        placeholder="Selecione o tipo do custo"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={{
          fontSize: 16,
          color: "#000",
        }}
      />

      <View style={styles.inputGroup}>
        <Ionicons name="document-text-outline" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#000"
          value={descricaoDoCusto}
          onChangeText={setDescricaoDoCusto}
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons name="pricetag-outline" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Valor do Custo"
          placeholderTextColor="#000"
          value={valorDoCusto}
          onChangeText={setValorDoCusto}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "#333",
  },
  dropdown: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 0,
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
