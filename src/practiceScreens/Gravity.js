import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Gravity = () => {
    const gravity = useAnimatedSensor(SensorType.GRAVITY);
    if (gravity){
        console.log('gravity',gravity.isAvailable);
    }
        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: withSpring(gravity.sensor.value.x * 20) },
                    { translateY: withSpring(gravity.sensor.value.y * 20) },
                ],
            };
        });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyle]} />
        </View>
    )
}

export default Gravity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    box: {
        height: 120,
        width: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
    },
});