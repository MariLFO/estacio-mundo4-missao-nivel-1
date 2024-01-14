import React, { useState } from 'react';
import { Text, Button, Image, TextInput, View, Platform, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.endereco}
          onChangeText={(value) => handleInputChange('endereco', value)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Contato:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.contato}
          onChangeText={(value) => handleInputChange('contato', value)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Categorias:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.categorias}
          onChangeText={(value) => handleInputChange('categorias', value)}
        />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {Platform.OS === 'web' ? (
        <input type="file" accept="image/*" onChange={handleSelectImage} />
      ) : (
        <Button title="Selecionar Imagem" onPress={handleSelectImage} />
      )}
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    width: 100,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default CadastroFornecedor;