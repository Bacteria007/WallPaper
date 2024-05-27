import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { capitalize, hp } from '../helpers/common'
import { theme } from '../constants/theme'

export const SectionView = ({ title, content, }) => {
    return (
        <View style={styles.sectionConatiner}>
            <Text style={styles.sectionTitle}>
                {capitalize(title)}
            </Text>
            <View>
                {content}
            </View>
        </View>
    )
}
export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {
    const onSelection = (item) => {
        setFilters({ ...filters, [filterName]: item })
    }
    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {

                    let isActive = filters && filters[filterName] === item
                    let backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white'
                    let color = isActive ? 'white' : theme.colors.neutral(0.7)

                    return (
                        <Pressable key={index} style={[styles.outLinedBtn, { backgroundColor }]} onPress={() => onSelection(item)}>
                            <Text style={[styles.outLinedBtnText, { color }]}>{capitalize(item)}</Text>
                        </Pressable>
                    )

                })
            }
        </View>
    )
}
export const ColorFilterRow = ({ data, filterName, filters, setFilters }) => {
    const onSelection = (item) => {
        setFilters({ ...filters, [filterName]: item })
    }
    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {

                    let isActive = filters && filters[filterName] === item
                   let borderColor=isActive?theme.colors.neutral(0.4):'white'


                    return (
                        <Pressable key={index} onPress={() => onSelection(item)}>
                            <View style={[styles.colorWrapper,{borderColor}]}>
                                <View style={[styles.color,{backgroundColor:item}]}></View>
                            </View>
                        </Pressable>
                    )

                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionConatiner: {
        gap: 8
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeghits.semibold,
        color: theme.colors.neutral(0.8),
    },
    flexRowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    outLinedBtn: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBg,
        borderRadius: theme.radius.xs,
        borderCurve: 'continuous'
    },
    colorWrapper: {
        padding: 3,
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderWidth: 2
    },
    color: {
        height: 30,
        width: 40,
        borderRadius: theme.radius.sm-3,
        borderCurve: 'continuous',

    }
}
)