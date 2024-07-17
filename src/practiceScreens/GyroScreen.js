import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {gyroscope} from 'react-native-sensors';

const GyroScreen = () => {
  const [gyroData, setGyroData] = useState({x: 0, y: 0, z: 0});
  const [gyroEnabled, setGyroEnabled] = useState(false);
  useEffect(() => {
    console.log(gyroscope);
    let subscription;
    if (gyroEnabled) {
      subscription = gyroscope.subscribe(gyroscopeData => {
        setGyroData(gyroscopeData);
      });
    } else {
      subscription?.remove();
    }
    return () => {
      subscription?.remove();
    };
  }, [gyroEnabled]);

  const handleGyroEnabled = () => {
    setGyroEnabled(!gyroEnabled);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GyroScreen</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{false: 'gray', true: 'green'}}
          thumbColor={gyroEnabled ? 'blue' : 'yellow'}
          value={gyroEnabled}
          onValueChange={handleGyroEnabled}
          style={styles.switch}
        />
      </View>
      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'purple',
          transform: [
            {translateX: gyroData.y * 10},
            {translateY: -gyroData.x * 10},
          ],
        }}></View>
    </SafeAreaView>
  );
};

export default GyroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginTop: 80,
    fontWeight: 'bold',
  },
  switchContainer: {
    marginBottom: 60,
    marginTop: 80,
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});
