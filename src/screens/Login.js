import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setvisible] = useState(false);

  const loginUser = () => {
    setvisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setvisible(false);
        console.log(JSON.stringify(res.docs[0].data()));
        goToNext(
          res.docs[0].data().name,
          res.docs[0].data().email,
          res.docs[0].data().userId,
        );
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('userId', userId);
    console.log('saved user data into local storage');
    navigation.navigate('Main');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: 30,
          color: 'black',
          alignSelf: 'center',
          marginTop: 100,
          fontWeight: '700',
        }}>
        Login
      </Text>

      <TextInput
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 200,
          alignSelf: 'center',
          paddingLeft: 10,
        }}
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setemail(txt)}
      />

      <TextInput
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 15,
          alignSelf: 'center',
          paddingLeft: 10,
        }}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setpassword(txt)}
      />
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'purple',
          marginTop: 20,
        }}
        onPress={() => {
          loginUser();
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Login User</Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 20,
          fontWeight: '600',
          textDecorationLine: 'underline',
          color: 'black',
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Or Signup?
      </Text>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;
