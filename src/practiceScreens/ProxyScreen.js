import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import proximity,{SubscriptionRef} from 'rn-proximity-sensor'

const ProxyScreen = () => {
  const sensorSubscriptionRef = useRef(SubscriptionRef||null);

  const [isShowingBalance, setIsShowingBalance] = useState(false);

  useEffect(() => {
    sensorSubscriptionRef.current = proximity.subscribe((values) => {
      if (values.distance==0) setIsShowingBalance(false);
      if (values.distance==5) setIsShowingBalance(true);
      // console.log(values);
    });
   

    return () => {
      if (sensorSubscriptionRef.current) {
        sensorSubscriptionRef.current.unsubscribe();
        sensorSubscriptionRef.current = null;
      }
    };
  }, []);
  return (
    <View style={[styles.container,{backgroundColor:isShowingBalance?'white':'black'}]}>
      <Text style={{color:isShowingBalance?'black':'white'}}>{isShowingBalance?'show':'hide'}</Text>
    </View>
  )
}

export default ProxyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})