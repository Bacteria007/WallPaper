import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
    Extrapolation,
    FadeInDown,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import { ColorFilterRow, CommonFilterRow, SectionView } from '../filterViews';
import { data } from '../../constants/data';

const CustomBackdrop = ({ style, animatedIndex }) => {
    const containerANimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP,
        );
        return { opacity };
    });
    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerANimatedStyle,
    ];
    return <Animated.View style={[containerStyle]}></Animated.View>;
};

const sections = {
    order: props => <CommonFilterRow {...props} />,
    orientation: props => <CommonFilterRow {...props} />,
    type: props => <CommonFilterRow {...props} />,
    colors: props => <ColorFilterRow {...props} />,
};
const FiltersModal = ({
    modalRef,
    filters,
    setFilters,
    onClose,
    onApply,
    onReset,
}) => {
    const snapPoints = useMemo(() => ['75%', '95%'], []);
 return (
        <View>
            <BottomSheetModal
                ref={modalRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdrop}
            //   onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View style={styles.content}>
                        <Text style={styles.filterText}>Filters</Text>
                        {Object.keys(sections).map((sectionName, index) => {
                            // section name is key ordes color...
                            let sectionView = sections[sectionName];
                            let sectionData = data.filters[sectionName];

                            return (
                                <Animated.View key={sectionName}
                                    entering={FadeInDown.delay((index + 100) + 100).springify().damping(11)}
                                >
                                    <SectionView
                                        title={sectionName}
                                        content={sectionView({
                                            data: sectionData,
                                            filters,
                                            setFilters,
                                            filterName: sectionName,
                                        })}
                                    />
                                </Animated.View>
                            );
                        })}
                        {/* actions */}
                        <Animated.View  entering={FadeInDown.delay(500).springify().damping(11)} style={styles.buttons}>
                            <Pressable style={styles.resetBtn} onPress={onReset}>
                                <Text style={styles.btnText}>Reset</Text>
                            </Pressable>
                            <Pressable style={styles.applyBtn} onPress={onApply}>
                                <Text style={[styles.btnText, { color: theme.colors.white }]}>Apply</Text>
                            </Pressable>
                        </Animated.View>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
};

export default FiltersModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        flex: 1,
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // width: wp(100),
    },
    filterText: {
        fontSize: hp(4),
        fontWeight: theme.fontWeghits.semibold,
        color: theme.colors.neutral(0.8),
        marginBottom: 5,
    },
    buttons: {
        flex: 1,
        gap: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    resetBtn: {
        flex: 1,
        backgroundColor: theme.colors.neutral(0.03),
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.md,
        borderCurve: 'continuous',
        borderWidth: 2, borderColor: theme.colors.grayBg
    },
    applyBtn: {
        flex: 1,
        backgroundColor: theme.colors.neutral(0.8),
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.md,
        borderCurve: 'continuous'
    },
    btnText: {
        fontSize: hp(2.2)
    }
});
