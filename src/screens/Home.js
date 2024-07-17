import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ApiCall } from '../utils/ApiCaller';
import data from '../data.json';
import MasonryList from 'react-native-masonry-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { capitalize, hp, wp } from '../helpers/common';
import { Icons } from '../assets/icons/Icons';
import Categories from '../components/categories';
import ImageCard from '../components/imageGrid';
import ImageGrid from '../components/imageGrid';
import { debounce } from 'lodash';
import FiltersModal from '../components/modals/filtersModal';

var page;

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top ? top + 10 : 20;
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [filters, setFilters] = useState(null);
  const [images, setImages] = useState([]);
  const [isEndReached, setIsEndReached] = useState(false)
 
  const openFiltersModal = () => {
    modalRef?.current?.present();
  };
  const closeFiltersModal = () => {
    modalRef?.current?.close();
  };
  const applyFilters = () => {
    if (filters) {
      page = 1,
        setImages([]);
      let params = {
        page,
        ...filters
      }
      if (activeCategory) params.category = activeCategory
      if (search) params.q = search
      fetchImages(params, false)
    }
    closeFiltersModal();
  };
  const resetFilters = () => {
    if (filters) {
      page = 1,
        setImages([]);
      setFilters(null)
      let params = {
        page,

      }
      if (activeCategory) params.category = activeCategory
      if (search) params.q = search
      fetchImages(params, false)
    }
    closeFiltersModal();
  };
  const clearFilter = (filterName) => {
    let updateFilters = { ...filters }
    delete updateFilters[filterName]
    setFilters(updateFilters)
    let page = 1
    setImages([]);
    let params = {
      page,
      ...updateFilters
    }
    if (activeCategory) params.category = activeCategory
    if (search) params.q = search
    fetchImages(params, false)


  }
  const handleChangeCategory = cat => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = {
      page,
      ...filters
    };
    if (cat) params.category = cat;
    fetchImages(params, false);
  };
  const fetchImages = async (params = { page: 1 }, append = true) => {
    console.log({ params, append });
    let res = await ApiCall(params);
    if (res.success && res?.data?.hits) {
      setImages([...res.data.hits]);
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };

  const handleSearch = text => {
    setSearch(text);
    if (text.length > 2) {
      // search for this text
      page = 1;
      setImages([]);
      // reset the category while searching
      setActiveCategory(null);
      fetchImages({ page, q: text, ...filters }, false);
    }
    if (text === '') {
      // reset result
      page = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      // reset the category while searching
      setActiveCategory(null);
      fetchImages({ page, ...filters }, false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const clearSearch = () => {
    setSearch('');
    searchInputRef?.current?.clear();
    // page = 1;
    // fetchImages({ page })
  };

  const handleScroll = (event) => {

    const contentHeight = event.nativeEvent.contentSize.height; // height of the content inide scrollview
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height; // total area visible on the screen
    const scrollOffset = event.nativeEvent.contentOffset.y;  // the user has scrolled vertically
    const bottomPositioon = contentHeight - scrollViewHeight;  // 
    if (scrollOffset >= bottomPositioon - 1) { // it means user his the end of scrolll view
      if (!isEndReached) {
        console.log('scrol');
        setIsEndReached(true)
        // fetch
        ++page;
        let params={
          page, ...filters,

        }
        if (activeCategory) params.category = activeCategory
        if (search) params.q = search
        fetchImages(params);
      }
    } else if (isEndReached) {

    }

  }
  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true
    })
  }
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      {/* header */}
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openFiltersModal}>
          <Icons.AntDesign
            name="filter"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}
        onScroll={handleScroll}
        scrollEventThrottle={5} //how often scroll event fire when scroll 5 ms
        ref={scrollRef}
      >
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Icons.Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            onChangeText={handleTextDebounce}
            // value={search}
            ref={searchInputRef}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch('')}>
              <Icons.Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {/* applied filters */}
        {
          filters && (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                {Object.keys(filters).map((key, index) => {
                  return (
                    <View key={key} style={styles.filterItem}>
                      {
                        key == 'colors' ?
                          <View style={[styles.filterColor, { backgroundColor: filters[key] }]}></View>
                          : (
                            <Text style={styles.filterItemText}>
                              {capitalize(filters[key])}
                            </Text>
                          )
                      }
                      <Pressable style={styles.filterCloseIcon} onPress={() => clearFilter(key)}>
                        <Icons.Ionicons name="close" color={theme.colors.neutral(0.9)} size={14} />
                      </Pressable>

                    </View>
                  )
                })}
              </ScrollView>
            </View>
          )
        }
        {/* iamges masonry grid */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
        {/* loading */}
        <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
          <ActivityIndicator size={'large'} />
        </View>
        {/* filters modal */}
        <FiltersModal
          modalRef={modalRef}
          filters={filters}
          setFilters={setFilters}
          onClose={closeFiltersModal}
          onApply={applyFilters}
          onReset={resetFilters}
        />
      </ScrollView >
    </View >
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    // backgroundColor: theme.colors.white,
  },
  image: {
    height: 200,
    width: '33.33%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop:10
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeghits.semibold,
    color: theme.colors.neutral(0.7),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: 6,
    paddingLeft: 10,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  searchIcon: {
    padding: 8,
  },
  filters: {
    paddingHorizontal: wp(4),
    gap: 10
  },
  filterItem: {
    backgroundColor: theme.colors.grayBg,
    padding: 8,
    flexDirection: 'row',
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
    alignItems: 'center'

  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7
  },
  filterColor: {
    height: 30, width: 40,
    borderRadius: 7
  }

});
