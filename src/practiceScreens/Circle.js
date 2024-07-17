import React from 'react';
import { View, StyleSheet, Text } from 'react-native';



export const MovingCircle = ({ x, y, size, color }) => {
  return <View style={styles.movingCircle(x, y, size, color)} ></View>
};


export const StaticCircle = ({ size, color }) => {
  return <View style={styles.staticCircle(size, color)} >
    {/* <Text style={{color:'white',fontWeight:'bold'}}>Hi</Text> */}
  </View>
};



const styles = StyleSheet.create({

  movingCircle: (x, y, size, color) => ({
    left: x - 25,
    top: y - 85,
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: color,
 }),
  
  staticCircle: (size, color) => ({
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: 999,
 }),

});
