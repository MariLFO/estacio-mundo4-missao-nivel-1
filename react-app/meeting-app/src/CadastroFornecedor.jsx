import React, { useState } from 'react';
import { Text, TextInput, View, Button, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let ImagePicker;
if (Platform.OS !== 'web') {
  ImagePicker = require('react-native-image-crop-picker').default;
};

const CadastroFornecedor = () => {
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    endereco: '',
    contato: '',
    categorias: '',
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (field, value) => {
    setFornecedor({
      ...fornecedor,
      [field]: value,
    });
  };

  const handleSelectImage = Platform.OS === 'web' ? (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  } : () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image.path);
    });
  };

  const handleSubmit = async () => {
    try {
      const existingSuppliers = await AsyncStorage.getItem('@fornecedor');
      let newSuppliers = JSON.parse(existingSuppliers);
      if (!newSuppliers || !Array.isArray(newSuppliers)) {
        newSuppliers = [];
      }
      newSuppliers.push({ ...fornecedor, image });
      await AsyncStorage.setItem('@fornecedor', JSON.stringify(newSuppliers));
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
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {Platform.OS === 'web' ? (
        <input type="file" accept="image/*" onChange={handleSelectImage} />
      ) : (
        <Button title="Selecionar Imagem" onPress={handleSelectImage} />
      )}
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
};

export default CadastroFornecedor;