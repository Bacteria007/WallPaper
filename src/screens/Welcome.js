import { Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
const Welcome = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'transparent'} translucent barStyle={'dark-content'}
            />
            <Image style={styles.imageStyle} source={require('../assets/images/welcome1.png')} />
            <Animated.View style={{ flex: 1 }} entering={FadeInDown.duration(600)}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradientStyle}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                />
                <View style={styles.contentContainer}>
                    <Animated.Text 
                    // entering={FadeInDown.delay(400).springify()} 
                    style={styles.title}>Pixels</Animated.Text>
                    <Animated.Text 
                    // entering={FadeInDown.delay(500).springify()} 
                    style={styles.punchLine}>Every pixels tells a story</Animated.Text>
                </View>
                <Animated.View 
                // entering={FadeInDown.delay(600).springify()} 
                style={styles.btnConatiner}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.startBtn}>
                        <Text style={styles.startText}>Start Explore</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    imageStyle: {
        height: hp(100),
        width: wp(100),
        position: 'absolute'
    },
    gradientStyle: {
        width: wp(100),
        height: hp(65),
        bottom: 0,
        position: 'absolute'
    },
    contentContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 14
    },
    title: {
        fontSize: hp(7),
        fontWeight: theme.fontWeghits.bold,
        color: theme.colors.neutral(0.9)
    },
    punchLine: {
        fontSize: hp(2.3),
        fontWeight: theme.fontWeghits.medium,
        color: theme.colors.neutral(0.9),
        marginBottom: 10,
        letterSpacing: 1
    },
    startBtn: {
        marginBottom: 50,
        backgroundColor: theme.colors.neutral(0.9),
        padding: 12,
        // paddingHorizontal: 90,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        width: wp(90)

    },
    startText: {
        color: theme.colors.white,
        fontSize: hp(3),
        fontWeight: theme.fontWeghits.medium,
        letterSpacing: 1,
        textAlign: 'center'
    },
    btnConatiner: { justifyContent: 'center', alignItems: 'center', width: wp(100) },
})