import {
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground,
    StatusBar,
    Text,
    ToastAndroid,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { hp, wp } from '../helpers/common';
import { Icons } from '../assets/icons/Icons';
import { theme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import { ReactNativeModal } from 'react-native-modal'
const ImageDetail = props => {
    const { item } = props.route.params;
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [status, setStatus] = useState('')
    const onLoad = () => {
        setStatus('')
    }
   
    const callback = res => {
        console.log('Response: ', res);
        if (res.status == "success") {
            hideModal()
            showSuccessToast()
            setShowLoader(false);
            // navigation.goBack()
        }
    };

    const setWallpaper = (type) => {
        setShowLoader(true)
        ManageWallpaper.setWallpaper(
            {
                uri: item.largeImageURL,
            },
            callback,
            type
        );
        hideModal();

    };
    const showModal = () => setIsVisible(true);
    const hideModal = () => setIsVisible(false);
    const showSuccessToast = () => {
        // ToastAndroid.showWithGravityAndOffset(
        //     'Wallpaper set successfully',
        //     ToastAndroid.SHORT,
        //     ToastAndroid.BOTTOM,
        //     25,
        //     50,

        //   );
        setShowToast(true);
        setTimeout(() => {
            hideSuccessToast();
        }, 1000);
    }; const hideSuccessToast = () => setShowToast(false);
    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'light-content'}
            />
            <ImageBackground
                onLoad={onLoad}
                style={[styles.image]}
                source={{ uri: item.largeImageURL }}
                resizeMethod='resize'
                resizeMode='cover'
                
                
                >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.btn}>
                    <Icons.Ionicons
                        name="chevron-back"
                        size={22}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn}>
                        <Icons.Entypo name="share" size={24} color={theme.colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showModal} style={styles.btn}>
                        <Icons.Ionicons
                            name="color-palette-outline"
                            size={24}
                            color={theme.colors.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Icons.Octicons
                            name="download"
                            size={24}
                            color={theme.colors.white}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {console.log(showModal)}

            <ReactNativeModal
                isVisible={isVisible}
                onBackdropPress={hideModal}
                onDismiss={hideModal}
                style={styles.modal}
                backdropColor='transparent'
                animationIn={'fadeInUp'}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => setWallpaper(TYPE.HOME)}>
                        <Text style={styles.btnText}>Home Screen</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => setWallpaper(TYPE.LOCK)}>
                        <Text style={styles.btnText}>Lock Screen</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => setWallpaper(TYPE.BOTH)}>
                        <Text style={styles.btnText}>Both</Text>
                    </TouchableOpacity>
                </View>
            </ReactNativeModal>
            {showLoader &&
                // <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: theme.colors.neutral(0.2), width: wp(100), alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
                // </View>
            }
            {/* success toast */}
            <ReactNativeModal
                isVisible={showToast}
                onBackdropPress={hideSuccessToast}
                onDismiss={hideSuccessToast}
                style={styles.modal}
                backdropColor='transparent'
                animationIn={'fadeInUp'}
            >
                <View style={styles.toast}>
                    <Text style={styles.toastText}>Wallpaper set successfully</Text>
                </View>
            </ReactNativeModal>
        </View>
    );
};

export default ImageDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent'
    },
    image: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor:'transparent'


    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
        // backgroundColor:'red'
           },
    backBtn: {
        height: hp(6),
        width: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.2)',

    },
    btn: {
        height: hp(6),
        width: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        backgroundColor: theme.colors.neutral(0.3),
    },
    contentContainer: {
        backgroundColor: 'red'
    },
    modal: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        // flex:1,
        // backgroundColor:'transparent',

    },
    modalContainer: {
        height: hp(20),
        width: wp(90),
        backgroundColor: 'white',
        borderRadius: theme.radius.sm,
        justifyContent: 'center'

    },

    line: {
        height: 1,
        width: wp(85),
        alignSelf: 'center',
        backgroundColor: theme.colors.grayBg
    },
    modalBtn: {
        height: hp(6),
        // backgroundColor:theme.colors.neutral(0.4),
        justifyContent: 'center',
        paddingHorizontal: wp(4)
    },
    btnText: {
        color: 'black',
        fontWeight: theme.fontWeghits.medium,
        fontSize: hp(2)
    },
    toast: {
        padding: 10, paddingHorizontal: 20,
        backgroundColor: theme.colors.neutral(0.3),
        borderRadius: theme.radius.sm,
        justifyContent: 'center'

    },
    toastText: {
        color: theme.colors.white,
        fontSize: hp(2)
    },
});
