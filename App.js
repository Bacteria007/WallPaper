import "react-native-gesture-handler";
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProxyScreen from './src/practiceScreens/ProxyScreen';
import Rotationscreen from './src/practiceScreens/Rotationscreen';
import Bluetooth from './src/practiceScreens/Bluetooth';
import Accelero from './src/practiceScreens/Accelero';
import Demo from './src/practiceScreens/Demo';
import Welcome from '././src/screens/Welcome';
import Home from '././src/screens/Home';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImageDetail from "./src/screens/ImageDetail";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Practice = () => {
  return (
      <Tab.Navigator initialRouteName='Accel'>
        <Tab.Screen name='Proxi' component={ProxyScreen} />
        <Tab.Screen name='Accel' component={Accelero} />
        <Tab.Screen name='Parallax' component={Rotationscreen} />
      </Tab.Navigator>
  )
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false,animation:'slide_from_right' }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ImageDetail" component={ImageDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
export default App;
