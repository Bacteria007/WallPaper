import { Text, View } from 'react-native'
import  { useAnimatedSensor, SensorType, useDerivedValue } from 'react-native-reanimated';

export default Gyro = () => {
    const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE);
    console.log('gyro', gyroscope.isAvailable);
    useDerivedValue(() => {
        const { x, y, z } = gyroscope.sensor.value;
        console.log({ x, y, z });
    });
    return (

        <View>
            <Text>x:{gyroscope.sensor.value.x}</Text>
            <Text>y:{gyroscope.sensor.value.y}</Text>
            <Text>z:{gyroscope.sensor.value.z}</Text>
        </View>

    )
}

