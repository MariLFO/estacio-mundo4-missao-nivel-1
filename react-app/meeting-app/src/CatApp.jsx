import React from 'react';
import { Text, View, Image } from 'react-native';
import logo from './logo.png';
 
const CatApp = () => {
  return (
    <View>
      <Image
        source={logo}
        style={{ width: 200, height: 200 }}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
};
 
export default CatApp;