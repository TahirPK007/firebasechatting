import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const registeruser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        console.log('user created');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (confirmpassword == '') {
      isValid = false;
    }
    if (confirmpassword !== password) {
      isValid = false;
    }
    return isValid;
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
        Signup
      </Text>
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
        placeholder="Enter Name"
        value={name}
        onChangeText={txt => setname(txt)}
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
        placeholder="Enter Mobile"
        value={mobile}
        onChangeText={txt => setmobile(txt)}
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
        placeholder="Enter Confirm Password"
        value={confirmpassword}
        onChangeText={txt => setconfirmpassword(txt)}
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
          if (validate()) {
            registeruser();
          } else {
            alert('Pls Enter Correct Data');
          }
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
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
          navigation.navigate('Login');
        }}>
        Or Login?
      </Text>
    </View>
  );
};

export default Signup;
