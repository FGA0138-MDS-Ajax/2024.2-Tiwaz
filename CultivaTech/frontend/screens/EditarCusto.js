import React, { useState } from "react";
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

export default function CadastrarCustos({ route, navigation }) {
  const { custoId } = route.params;

  const custos = [
    { 
        id: 1,
        nomeDoCusto: "Marcos", 
        tipoDoCusto: "Funcionario",
        descricaoDoCusto: "Marcos trabalhou na plantação de milho", 
        valorDoCusto: "R$ 5.000,00", 
        dataDoCusto: "05/01/2025" },
    { 
        id: 2, 
        nomeDoCusto: "John Deere", 
        tipoDoCusto: "Maquina", 
        descricaoDoCusto: "Aluguel de trator para preparo do solo",
        valorDoCusto: "R$ 12.000,00", 
        dataDoCusto: "10/01/2025" },
  ];

  const custoToEdit = custos.find((item) => item.id === custoId);

  if (!custoToEdit) {
    Alert.alert("Erro", "Custo não encontrado.");
    navigation.goBack();
    return null;
  }
  const [nomeDoCusto, setNomeDoCusto] = useState(custoToEdit.nomeDoCusto);
  const [dataDoCusto, setDataDoCusto] = useState(custoToEdit.dataDoCusto);
  const [descricaoDoCusto, setDescricaoDoCusto] = useState(custoToEdit.descricaoDoCusto);
  const [valorDoCusto, setValorDoCusto] = useState(custoToEdit.valorDoCusto);

  // Estados para o DropDownPicker do tipo do custo
  const [open, setOpen] = useState(false);
  const [tipoDoCusto, setTipoDoCusto] = useState(custoToEdit.tipoDoCusto);
  const [items, setItems] = useState([
    { label: "Funcionario", value: "Funcionario" },
    { label: "Maquina", value: "Maquina" },
    { label: "Outros", value: "Outros" },
  ]);

  const isFormValid = () => {
    return (
      nomeDoCusto &&
      dataDoCusto &&
      descricaoDoCusto &&
      valorDoCusto &&
      tipoDoCusto
    );
  };
  const handleDelete = () => {
    Alert.alert(
      "Excluir Custo",
      "Tem certeza que deseja excluir este custo?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            Alert.alert("Sucesso", "Custo excluído com sucesso!");
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleSave = () => {
    if (!isFormValid()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    // Simula o salvamento sem usar service externa
    Alert.alert("Sucesso", "Custo atualizado com sucesso!");
    navigation.goBack();
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
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
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
