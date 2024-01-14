import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MenuInicial() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          color="#841584"
          title="Ir para Cadastro de Fornecedor"
          onPress={() => navigation.navigate('CadastroFornecedor')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="#841584"
          title="Ir para Listagem de Fornecedores"
          onPress={() => navigation.navigate('ListagemFornecedores')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    margin: 20,
  },
});

export default MenuInicial;