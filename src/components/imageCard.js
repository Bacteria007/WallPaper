import { Image, Pressable, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import React, { useState } from 'react'
import { getImageSize, hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import { useNavigation } from '@react-navigation/native'
import ReactNativeModal from 'react-native-modal'
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import { Icons } from '../assets/icons/Icons'

const ImageCard = ({ item, index, columns }) => {
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [status, setStatus] = useState('')
  const isLastItem = () => {
    return (index + 1) % columns === 0
  }
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) }
  }
  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight
    const maxWidth = wp(92)
    let calculatedHeight = maxWidth / aspectRatio
    let calculatedWidth = maxWidth
    if (aspectRatio < 1) {   //it means image is portrait
      calculatedWidth = calculatedHeight * aspectRatio
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight
    }
  }


  // image modal
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
  const showImageModal = () => setImageModal(true);
  const hideImageModal = () => setImageModal(false);
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
    <TouchableOpacity
      onPress={() => navigation.navigate('ImageDetail', { item: item })}
      // onPress={showImageModal}
      activeOpacity={0.6} style={[styles.imageWrapper, !isLastItem() && styles.spacing]}>
      <Image
        source={{ uri: item?.webformatURL }}
        style={[styles.image, getImageHeight()]}
      />
      <ReactNativeModal
        isVisible={imageModal}
        style={styles.imageModal}
        backdropOpacity={0.6}
        onBackButtonPress={hideImageModal}
        onBackdropPress={hideImageModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <View>
          <Image
            source={{ uri: item?.webformatURL }}
            resizeMethod='resize'
            resizeMode='cover'
            style={[styles.modalImage, getSize()]}
          />
          <View>
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
          </View>
        </View>
      </ReactNativeModal>


      <ReactNativeModal
        isVisible={isVisible}
        onBackdropPress={hideModal}
        onDismiss={hideModal}
        style={styles.optionsModal}
        backdropColor='transparent'
        animationIn={'fadeInUp'}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.optionBtn} onPress={() => setWallpaper(TYPE.HOME)}>
            <Text style={styles.btnText}>Home Screen</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.optionBtn} onPress={() => setWallpaper(TYPE.LOCK)}>
            <Text style={styles.btnText}>Lock Screen</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.optionBtn} onPress={() => setWallpaper(TYPE.BOTH)}>
            <Text style={styles.btnText}>Both</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      {showLoader && <ActivityIndicator size={'large'} />}
    </TouchableOpacity>

  )
}

export default ImageCard

const styles = StyleSheet.create({
  image: {
    height: hp(30),
    width: wp(100)
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBg,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    marginBottom: wp(2),
    resizeMode: 'cover',


  },
  spacing: {
    marginRight: wp(2)
  },
  imageModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    borderRadius: theme.radius.lg

  },
  optionsModal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  optionBtn: {
    height: hp(6),
    // backgroundColor:theme.colors.neutral(0.4),
    justifyContent: 'center',
    paddingHorizontal: wp(4)
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
})