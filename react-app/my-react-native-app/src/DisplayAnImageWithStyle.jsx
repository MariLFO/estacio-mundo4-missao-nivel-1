import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import logo from './logo.png';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={logo}
      />
    </View>
  );
};
 
export default DisplayAnImageWithStyle;