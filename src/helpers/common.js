import { Dimensions } from 'react-native'
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export const wp = (percent) => {
    return (percent * deviceWidth) / 100
}
export const hp = (percent) => {
    return (percent * deviceHeight) / 100
}
export const getColmnCount = (percent) => {
    if (deviceWidth >= 1024) {
        return 4
    } else if (deviceWidth >= 768) {
        return 3
    } else {
        return 2
    }
}

export const getImageSize = (height, width) => {
    if (width > height) {
        // landcsape
        return 250
    } else if (width < height) {
        // portrait
        return 300;
    } else {
        // square
        return 200
    }
}

export const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}