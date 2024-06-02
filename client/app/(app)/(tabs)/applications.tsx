import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Applications() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Applications Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});
