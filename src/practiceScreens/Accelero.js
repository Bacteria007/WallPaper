import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { accelerometer } from 'react-native-sensors';
import { MovingCircle, StaticCircle } from './Circle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../helpers/common';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const circleRadius = 30; // Assuming the radius of both circles is 30

const Accelero = () => {
    const [circlePosition, setCirclePosition] = useState({
        x: screenWidth,
        y: screenHeight,
    });
    const [isTouching, setIsTouching] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false); // State to manage pause/resume

    useEffect(() => {
        const subscription = accelerometer.subscribe(({ x, y }) => {
            if (!paused) { // Check if the game is paused
                const newX = circlePosition.x - x;
                const newY = circlePosition.y + y;
                const updatedX = Math.max(25, Math.min(screenWidth - 25, newX));
                const updatedY = Math.max(25, Math.min(screenHeight - 110, newY));
                setCirclePosition({ x: updatedX, y: updatedY });

                // Check for collision
                const distance = Math.sqrt(
                    Math.pow(circlePosition.x - 30, 2) +
                    Math.pow(circlePosition.y - 30, 2)
                );
                if (distance <= circleRadius * 2) {
                    console.log({ distance: distance });
                    setIsTouching(true);
                    setPaused(true); // Pause the game when collision happens
                } else {
                    setIsTouching(false);
                    // console.log({ distance: distance });
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [circlePosition, paused]);

    // Alert user when the circle touches the red circle
    useEffect(() => {
        if (isTouching) {
            Alert.alert('Game Over', 'Purple circle touched the red one!', [
                {
                    text: 'OK',
                    onPress: () => {
                        setPaused(false); // Resume the game when OK is pressed
                        setCirclePosition({ x: screenWidth, y: screenHeight }); // Reset circle position
                    }
                }
            ]);
        }
    }, [isTouching]);

    return (
        <SafeAreaView style={styles.container}>
            <StaticCircle size={60} color={'red'} />
            <MovingCircle
                x={circlePosition.x}
                y={circlePosition.y}
                size={60}
                color={'purple'}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        // position: 'absolute',
        // height: hp(100),
        // width: wp(100)
    },
});

export default Accelero;






{
    /* <Svg height="100%" width="100%" style={{ backgroundColor: 'yellow', flex: 0.6 }}>
  <Circle cx={x} cy={y} r={circleRadius} fill="blue" />
  </Svg>   */
}

// const panResponder = useRef(
//     PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onPanResponderMove: (evt, gestureState) => {
//             const newX = x + gestureState.dx;
//             const newY = y + gestureState.dy;
//             onMove(newX, newY);
//         },
//     })
// ).current;
