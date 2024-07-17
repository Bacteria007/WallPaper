import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

const Demo = () => {
  return (
    <View style={styles.container}>
      <Neomorph
        // inner
        swapShadows
        style={styles.neomorph}
      >
        <Text>Continue with Google</Text>
      </Neomorph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neomorph: {
    borderRadius: 25,
    backgroundColor: 'red',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Demo;
