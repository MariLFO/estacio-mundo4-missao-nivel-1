import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroFornecedor from './CadastroFornecedor';
import ListagemFornecedores from './ListagemFornecedores';
import MenuInicial from './MenuInicial';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuInicial">
        <Stack.Screen name="MenuInicial" component={MenuInicial} options={{ title: 'Menu Inicial' }} />
        <Stack.Screen name="CadastroFornecedor" component={CadastroFornecedor} options={{ title: 'Cadastro de Fornecedor' }} />
        <Stack.Screen name="ListagemFornecedores" component={ListagemFornecedores} options={{ title: 'Listagem de Fornecedores' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;