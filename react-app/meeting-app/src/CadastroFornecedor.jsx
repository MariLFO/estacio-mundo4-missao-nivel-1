import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroFornecedor = () => {
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    endereco: '',
    contato: '',
    categorias: '',
  });

  const handleInputChange = (field, value) => {
    setFornecedor({
      ...fornecedor,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const jsonValue = JSON.stringify(fornecedor)
      await AsyncStorage.setItem('@fornecedor', jsonValue)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput
        value={fornecedor.nome}
        onChangeText={(value) => handleInputChange('nome', value)}
      />
      <Text>Endereço:</Text>
      <TextInput
        value={fornecedor.endereco}
        onChangeText={(value) => handleInputChange('endereco', value)}
      />
      <Text>Contato:</Text>
      <TextInput
        value={fornecedor.contato}
        onChangeText={(value) => handleInputChange('contato', value)}
      />
      <Text>Categorias:</Text>
      <TextInput
        value={fornecedor.categorias}
        onChangeText={(value) => handleInputChange('categorias', value)}
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
};

export default CadastroFornecedor;