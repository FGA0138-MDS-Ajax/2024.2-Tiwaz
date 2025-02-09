import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Inicial'; 
import CadastroPlantacao from '../screens/CadastroPlantacao'; 
import CadastroEstoque from '../screens/CadastroEstoque';
import CadastroCusto from '../screens/CadastroCusto';
import Relatorios from '../screens/Relatorios';
import VizualizarPlantacoes from '../screens/VizualizarPlantacoes';
import VizualizarEstoque from '../screens/VizualizarEstoque';
import CadastroColheita from '../screens/CadastroColheita';
import PrevisaoTempo from '../screens/PrevisaoDoTempo';
import VizualizarCustos from '../screens/VizualizarCustos';
import VizualizarPlantacaoIndividual from '../screens/VizualizarPlantacaoIndividual';
import CadastroInsumos from '../screens/CadastroInsumos';
import { Ionicons } from '@expo/vector-icons';
import EditarInsumos from '../screens/EditarInsumos';
import EditarColheita from '../screens/EditarColheita';
import EditarPlantacao from '../screens/EditarPlantacao';
import EditarCusto from '../screens/EditarCusto';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* TELA EDITAR PLANTACAO*/}
        <Stack.Screen 
          name="EditarPlantacao" 
          component={EditarPlantacao} 
          options={{
            title: "Editar Plantação",
            headerStyle: { backgroundColor: "#E3F2FD" }, // Cor de fundo do cabeçalho
            headerTintColor: "#4FC3F7", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#4FC3F7" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA INICIAL*/}
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Sem cabeçalho padrão
        />
        {/* TELA PREVISAO DO TEMPO*/}
        <Stack.Screen 
          name="PrevisaoTempo" 
          component={PrevisaoTempo} 
          options={{
            title: "Previsão do Tempo",
            headerStyle: { backgroundColor: "#E3F2FD" }, // Cor de fundo do cabeçalho
            headerTintColor: "#4FC3F7", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#4FC3F7" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA CADASTRO PLANTACAO*/}
        <Stack.Screen 
          name="CadastroPlantacao" 
          component={CadastroPlantacao} 
          options={{
            title: "Cadastro da Plantacao",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA VIZUALIZAR PLANTACAO INDIVIDUAL*/}
        <Stack.Screen 
          name="VizualizarPlantacaoIndividual" 
          component={VizualizarPlantacaoIndividual} 
          options={{
            title: "Detalhes da Plantacao",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA EDITAR INSUMOS*/}
        <Stack.Screen
          name="EditarInsumos"
          component={EditarInsumos}
          options={{
            title: "Editar Insumo",
            headerStyle: { backgroundColor: "#E0E0E0" },
            headerTintColor: "#000",
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* TELA EDITAR COLHEITA*/}
        <Stack.Screen
          name="EditarColheita"
          component={EditarColheita}
          options={{
            title: "Editar Colheita",
            headerStyle: { backgroundColor: "#E0E0E0" },
            headerTintColor: "#000",
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* TELA EDITAR CUSTO*/}
        <Stack.Screen
          name="EditarCusto"
          component={EditarCusto}
          options={{
            title: "Editar Custo",
            headerStyle: { backgroundColor: "#E0E0E0" },
            headerTintColor: "#000",
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* TELA RELATORIOS*/}
        <Stack.Screen
          name="Relatorios"
          component={Relatorios}
          options={{
            title: "Relatorios",
            headerStyle: { backgroundColor: "#E0E0E0" },
            headerTintColor: "#000",
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />


        {/* TELA CADASTRO ESTOQUE*/}
        <Stack.Screen 
          name="CadastroEstoque" 
          component={CadastroEstoque} 
          options={{ title: "Cadastro do Estoque"  }} // Sem cabeçalho padrão
        />
        {/* TELA GERENCIAR CUSTOS*/}
        <Stack.Screen 
          name="VizualizarCustos" 
          component={VizualizarCustos} 
          options={( {navigation} ) => ({
            title: "Gerenciar Custos",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate("HomeScreen")} 
                style={{ 
                  padding: 10 
                }}>
              </TouchableOpacity>
            ),
          })} />
        {/* TELA CADASTRO CUSTOS*/}
        <Stack.Screen 
          name="CadastroCusto" 
          component={CadastroCusto} 
          options={({ navigation }) => ({
            title: "Cadastrar Novo Custo",
            headerStyle: { backgroundColor: "#E0E0E0" },
            headerTintColor: "#000",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("VizualizarCustos")} 
              style={{ padding: 10 }}>
              </TouchableOpacity>
            ),
          })} 
        />
        {/* TELA RELATORIOS*/}
        <Stack.Screen 
          name="CadastroInsumos" 
          component={CadastroInsumos} 
          options={{
            title: "Adicionar Insumos",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA VIZUALIZAR PLANTACOES*/}
        <Stack.Screen 
          name="VizualizarPlantacoes" 
          component={VizualizarPlantacoes} 
          options={{
            title: "Gerenciamento de Plantio",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA VIZUALIZAR ESTOQUE*/}
        <Stack.Screen 
          name="VizualizarEstoque" 
          component={VizualizarEstoque} 
          options={{
            title: "Estoque",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }} 
        />
        {/* TELA Cadastar Colheita*/}
        <Stack.Screen 
          name="CadastroColheita" 
          component={CadastroColheita} 
          options={{
            title: "Cadastrar Colheita",
            headerStyle: { backgroundColor: "#E0E0E0" }, // Cor de fundo do cabeçalho
            headerTintColor: "#000", // Cor do texto e ícones
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }} // Sem cabeçalho padrão
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;