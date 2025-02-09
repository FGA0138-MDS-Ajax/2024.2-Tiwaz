import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { listarPlantacoes } from "../services/plantacaoService";


export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState({
    condition: "Carregando...",
    temperature: "--",
    rainForecast: "--",
  });

  const [statistics, setStatistics] = useState({
    totalPlantations: 0,
    totalProfit: 0,
  });
  

// Função para buscar plantações do backend
const fetchPlantations = async () => {
  setRefreshing(true); // Mostra que a tela está atualizando
  try {
    const response = await listarPlantacoes();
    console.log("📌 Dados recebidos do backend:", response);

    if (response && response.success && Array.isArray(response.data)) {
      console.log("✅ Atualizando estado das plantações...");
      setRecentPlantations(response.data); // Atualiza corretamente o estado
      setStatistics({
        totalPlantations: response.data.length,
        totalProfit: response.data.reduce((acc, plant) => acc - (plant.custoInicial || 0), 0),
      });
    } else {
      console.error("⚠️ Resposta inesperada do backend:", response);
      setRecentPlantations([]);
    }
  } catch (error) {
    console.error("❌ Erro ao listar plantações:", error);
    Alert.alert("Erro", "Não foi possível carregar as plantações.");
    setRecentPlantations([]);
  } finally {
    setRefreshing(false);
  }
};


  
  const [recentPlantations, setRecentPlantations] = useState([]);
  
  {/* Função que simula a atualização dos dados da tela. */}
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchPlantations(); // Chama a API do backend ao atualizar
    setRefreshing(false);
}, []);

useEffect(() => {
  console.log("🧐 Estado atualizado - Plantações:", recentPlantations);
}, [recentPlantations]);

  {/* Executa uma lógica sempre que a tela do componente recebe o foco, ou seja, quando o usuário navega para essa tela. */}

  useFocusEffect(
    React.useCallback(() => {
      fetchPlantations(); // Chama a função corretamente
    }, [])
  );

  
  const getStatusColor = (status) => {
    switch (status) {
      case "Em Crescimento":
        return "#388E3C";
      case "Colhido":
        return "#FFA726";
      default:
        return "#666";
    }
  };

  {/*Formata números em valores monetários no padrão brasileiro (BRL, R$).*/ }
  const formatCurrency = (value) => {
    const formattedValue = Math.abs(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return value < 0 ? `-${formattedValue}` : formattedValue;
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/images/fundo3.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Bem-Vindo Agricultor</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.weatherContainer}
            onPress={() => navigation.navigate("PrevisaoTempo")}
          >
            <Ionicons name="cloud" size={40} color="#4FC3F7" />
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherTitle}>Condições Atuais</Text>
              <Text style={styles.weatherText}>
                {weatherData.condition} • {weatherData.temperature}°C
              </Text>
              <Text style={styles.weatherSubtext}>
                Próxima chuva em: {weatherData.rainForecast} dias
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#388E3C" />
          </TouchableOpacity>

          <View style={styles.summaryContainer}>
            <View
              style={styles.summaryItem}
            >
              <Ionicons name="leaf" size={30} color="#388E3C" />
              <View>
                <Text style={styles.summaryLabel}>Total de Plantações</Text>
                <Text style={styles.summaryText}>
                  {statistics.totalPlantations}
                </Text>
              </View>
            </View>

            <View
              style={styles.summaryItem}
            >
              <Ionicons name="cash" size={30} color="#388E3C" />
              <View>
                <Text style={styles.summaryLabel}>Lucro Total</Text>
                <Text style={styles.summaryText}>
                  {formatCurrency(statistics.totalProfit)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Plantações Recentes</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("VizualizarPlantacoes")}
              >
                <Text style={styles.seeAllText}>Ver Todas</Text>
              </TouchableOpacity>
            </View>
                  
            {recentPlantations.length > 0 ? (
    recentPlantations.map((plantation) => (
        <View key={plantation.id} style={[styles.plantationItem, { padding: 12 }]}>
            <View style={styles.plantationInfo}>
                <Text style={styles.plantationName}>{plantation.nome}</Text>
                <Text style={styles.plantationDetails}>
                    {plantation.tipo} • {plantation.areaPlantada ? `${plantation.areaPlantada} hectares` : `${plantation.quantidadePlantada} unidades`}
                </Text>
                <Text style={[styles.statusText, { color: getStatusColor(plantation.status) }]}>
                    {plantation.status}
                </Text>
            </View>
        </View>
    ))
) : (
    <Text style={{ textAlign: "center", color: "#888", marginTop: 10 }}>
        Nenhuma plantação encontrada.
    </Text>
)}


          </View>

           {/* Linha 1: Gerenciar Plantações + Baixar PDF */}
           <View style={styles.doubleActionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonGerenciarPlantacoes]}
              onPress={() => navigation.navigate("VizualizarPlantacoes")}
              activeOpacity={0.8}
            >
              <Ionicons name="leaf" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>Gerenciar Plantações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonRelatorio]}
              onPress={() => navigation.navigate("GerarRelatorio")}
              activeOpacity={0.8}
            >
              <Ionicons name="document-text" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>Baixar Relatorio (PDF)</Text>
            </TouchableOpacity>
          </View>

        {/* Linha 2: Estoque + Custos */}
          <View style={styles.doubleActionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonEstoque]}
              onPress={() => navigation.navigate("VizualizarEstoque")}
              activeOpacity={0.8}
            >
              <Ionicons name="cube" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>Gerenciar Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonCustos]}
              onPress={() => navigation.navigate("VizualizarCustos")}
              activeOpacity={0.8}
            >
              <Ionicons name="calculator" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>Gerenciar Custos</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </ImageBackground>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dateText: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 5,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  weatherDetails: {
    flex: 1,
    marginLeft: 10,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0288D1",
  },
  weatherText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2,
  },
  weatherSubtext: {
    fontSize: 14,
    color: "#666",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.97)",
    padding: 15,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388E3C",
    marginLeft: 10,
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.97)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#388E3C",
    fontWeight: "600",
  },
  doubleActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actionButtonGerenciarPlantacoes: {
    backgroundColor: "#388E3C",
    width: "99%",
    flex: 1,
    marginRight: 10, // Espaço entre os botões
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 10,
  },
  actionButtonRelatorio: {
    backgroundColor: "#D32F2F", // Vermelho
    flex: 1,
    marginLeft: 10, // Espaço entre os botões
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 10,
  },
  plantationItem: {
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  plantationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  plantationIcon: {
    marginRight: 10,
  },
  plantationTitles: {
    flex: 1,
  },
  plantationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  plantationDetails: {
    fontSize: 14,
    color: "#666",
  },
  plantationStatus: {
    alignItems: "flex-start",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#388E3C",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  quickActionsContainer: {
    marginTop: 0, // Espaço acima da seção de ações rápidas
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    flexShrink: 1,
  },
  
  doubleActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButtonEstoque: {
    backgroundColor: "#1976D2",
    flex: 1,
    marginRight: 10, // Espaço entre os dois botões menores
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  actionButtonCustos: {
    backgroundColor: "#FF7043",
    flex: 1,
    marginLeft: 10, // Espaço entre os dois botões menores
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    
  },
});
