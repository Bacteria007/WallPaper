import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import Animated, { FadeInRight } from 'react-native-reanimated'

const Categories = ({ activeCategory, handleChangeCategory }) => {

    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatlistContainer}
            showsHorizontalScrollIndicator={false}
            data={data.categories}
            keyExtractor={item => item}
            renderItem={({ item, index }) => (
                <CategoryItem
                    isActive={activeCategory == item}
                    handleChangeCategory={handleChangeCategory}
                    title={item} index={index} />
            )}
        />
    )
}

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
    let textColor=isActive?theme.colors.white:theme.colors.neutral(0.8)
    let bgColor=isActive?theme.colors.neutral(0.8):theme.colors.white

    return (
        <Animated.View entering={FadeInRight.delay(index+200).duration(1000).springify().damping(14)}>
            <Pressable onPress={() => handleChangeCategory(isActive?null:title)}
                style={[styles.category,{backgroundColor:bgColor}]}>
                <Text style={[styles.title,{color:textColor}]}>{title}</Text>
            </Pressable>
        </Animated.View>
    )
}
export default Categories

const styles = StyleSheet.create({
    flatlistContainer: {
        gap: 8,
        paddingHorizontal: wp(4)
    },
    category: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.colors.grayBg,
        backgroundColor: 'white',
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous',
    },
    title: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeghits.medium,

    }

})