import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Componente de tabela customizado
const CustomTable = ({ data, columns, onEdit }) => (
  <View style={styles.tableContainer}>
    <View style={styles.tableHeader}>
      {columns.map((column, index) => (
        <Text
          key={index}
          style={[styles.headerCell, { flex: column.flex || 1 }]}
        >
          {column.label}
        </Text>
      ))}
      <Text style={[styles.headerCell, { flex: 0.5, textAlign: "center" }]}>
        Ações
      </Text>
    </View>
    {data.map((item, rowIndex) => (
      <View
        key={item.id}
        style={[
          styles.tableRow,
          rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
        ]}
      >
        {columns.map((column, cellIndex) => (
          <Text
            key={cellIndex}
            style={[styles.cell, { flex: column.flex || 1 }]}
            numberOfLines={1}
          >
            {item[column.key]}
          </Text>
        ))}
        <View
          style={[
            styles.actionsContainer,
            { flex: 0.5, justifyContent: "center" },
          ]}
        >
          <TouchableOpacity
            onPress={() => onEdit(item.id)}
            style={styles.actionButton}
          >
            <Ionicons name="pencil" size={20} color="#388E3C" />
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
);

export default function VisualizarPlantacao({ route, navigation }) {
  const { plantacaoId, plantacaoData } = route.params;

  const plantacao = {
    id: plantacaoId,
    name: plantacaoData.name,
    type: plantacaoData.type,
    plantingDate: plantacaoData.plantingDate,
    measure: plantacaoData.measure,
    cost: plantacaoData.cost,
  };

  const colheitas = [
    {
      id: 1,
      quality: 4,
      harvestDate: "10/01/2025",
      measurementType: "Área",
      harvestAmount: "100 He",
      harvestCost: "R$ 500,00",
      saleValue: "R$ 1000,00",
    },
    {
      id: 2,
      quality: 3,
      harvestDate: "12/01/2025",
      measurementType: "Quantidade",
      harvestAmount: "200 Kg",
      harvestCost: "R$ 800,00",
      saleValue: "R$ 1500,00",
    },
  ];

  const colheitasColumns = [
    { key: "harvestDate", label: "Data", flex: 1 },
    { key: "harvestAmount", label: "Quantidade", flex: 1 },
    { key: "saleValue", label: "Valor Venda", flex: 1 },
  ];

  const insumos = [
    { id: 1, name: "Adubo X", quantity: "500 kg", cost: "R$ 10.000,00" },
    { id: 2, name: "Fertilizante Y", quantity: "300 kg", cost: "R$ 7.500,00" },
  ];

  const insumosColumns = [
    { key: "name", label: "Nome", flex: 1 },
    { key: "quantity", label: "Quantidade", flex: 1 },
    { key: "cost", label: "Valor", flex: 1 },
  ];

  const custosAdicionais = [
    { id: 1, type: "Funcionário", value: "R$ 5.000,00", date: "05/01/2025" },
    { id: 2, type: "Maquinário", value: "R$ 12.000,00", date: "10/01/2025" },
  ];

  const custosColumns = [
    { key: "type", label: "Tipo", flex: 1.5 },
    { key: "value", label: "Valor", flex: 1 },
    { key: "date", label: "Data", flex: 1 },
  ];

  const Section = ({ title, data, columns, onAdd, onEdit }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <CustomTable data={data} columns={columns} onEdit={onEdit} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{plantacao.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Tipo: {plantacao.type}</Text>
          <Text style={styles.detailText}>
            Área Plantada: {plantacao.measure}
          </Text>
          <Text style={styles.detailText}>
            Data do Plantio: {plantacao.plantingDate}
          </Text>
          <Text style={styles.detailText}>Custo Inicial: {plantacao.cost}</Text>
        </View>

        <Section
          title="Colheitas"
          data={colheitas}
          columns={colheitasColumns}
          onAdd={() => navigation.navigate("CadastroColheita")}
          onEdit={(id) => navigation.navigate("EditarColheita", { harvestId: id })}
        />

        <Section
          title="Insumos"
          data={insumos}
          columns={insumosColumns}
          onAdd={() => navigation.navigate("CadastroInsumos")}
          onEdit={(id) => navigation.navigate("EditarInsumos", { insumoId: id })}
        />

        <Section
          title="Custos Adicionais"
          data={custosAdicionais}
          columns={custosColumns}
          onAdd={() => navigation.navigate("CadastroCusto")}
          onEdit={(id) => navigation.navigate("EditarCusto", { custoId: id })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  headerContainer: {
    padding: 15,
    backgroundColor: "#388E3C",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "#E8F5E9",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  sectionContainer: {
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#388E3C",
    borderRadius: 8,
    padding: 8,
  },
  tableContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#388E3C",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "left",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  evenRow: {
    backgroundColor: "#fff",
  },
  oddRow: {
    backgroundColor: "#F5F5F5",
  },
  cell: {
    fontSize: 14,
    color: "#000",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 6,
  },
});
