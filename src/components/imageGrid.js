import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MasonryFlashList} from '@shopify/flash-list';
import {getColmnCount, hp, wp} from '../helpers/common';
import ImageCard from './imageCard';

const ImageGrid = ({images}) => {
  const columns = getColmnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyle}
        bounces={true}
        initialNumberToRender={1000}
        renderItem={({item, index}) => (
          <ImageCard item={item} index={index} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
