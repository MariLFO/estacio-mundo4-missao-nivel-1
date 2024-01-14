import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListagemFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@fornecedor')
        setFornecedores(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch(e) {
        console.log(e);
      }
    }

    fetchFornecedores();
  }, []);

  useEffect(() => {
    setFilteredFornecedores(
      fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, fornecedores]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.nome}</Text>
      <Text>{item.endereco}</Text>
      <Text>{item.contato}</Text>
      <Text>{item.categorias}</Text>
    </View>
  );

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar fornecedores..."
      />
      <FlatList
        data={filteredFornecedores}
        renderItem={renderItem}
        keyExtractor={(item) => item.nome}
      />
    </View>
  );
};

export default ListagemFornecedores;