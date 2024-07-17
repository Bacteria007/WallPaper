import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Rotationscreen() {
  const rotation = useAnimatedSensor(SensorType.ROTATION, { interval: 20 });  //milisec
  if (rotation) {
    console.log('rotation', rotation.isAvailable);
    rotation.config.adjustToInterfaceOrientation
  }
  useDerivedValue(() => {
    const { pitch, roll, yaw } = rotation.sensor.value
    // console.log({ pitch, roll, yaw });
  })
  const foregroundStyle = useAnimatedStyle(() => {
    const { pitch, roll } = rotation.sensor.value
    return {
      transform: [{ translateX: withSpring(-roll * 50, { damping: 200 }) }, { translateY: withSpring(-pitch * 50, { damping: 200 }) }]
    }
  })
  const backgroundStyle = useAnimatedStyle(() => {
    const { pitch, roll } = rotation.sensor.value
    return {
      transform: [{ translateX: withSpring(-roll * 25, { damping: 200 }) }, { translateY: withSpring(-pitch * 25, { damping: 200 }) }]
    }
  })
  return (
    <View style={styles.container}>
      <Animated.Image style={backgroundStyle} source={require('../assets/images/background.jpg')} />
      <Animated.Image
        source={require('../assets/images/foreground.png')}
        style={[styles.forground, foregroundStyle]}
      />
      <Text style={styles.title}>Parallex</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'centers',
  },
  forground: {
    position: 'absolute',
    height: '100%',
    width: '150%',
    bottom: -80
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    marginTop: 100,
    position: 'absolute',
    fontWeight: 'bold',
  },
});
