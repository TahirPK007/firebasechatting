import {View, Text, useAnimatedValue} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('userId');
    if (id !== null) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 40, color: 'white', textAlign: 'center'}}>
        Firebase Chatting
      </Text>
    </View>
  );
};

export default Splash;
