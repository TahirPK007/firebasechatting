import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Users = () => {
  const navigation = useNavigation();
  const [users, setusers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage.getItem('userId');
    let tempdata = [];
    const email = await AsyncStorage.getItem('email');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempdata.push(item.data());
          });
        }
        setusers(tempdata);
        // console.log(JSON.stringify(res.docs[0].data()));
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: 'white',
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'purple', fontSize: 20, fontWeight: '700'}}>
          Firebase Chatting App
        </Text>
      </View>
      <View>
        <FlatList
          data={users}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: 20,
                  flexDirection: 'row',
                  height: 60,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingLeft: 20,
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('Chat', {
                    data: item,
                    id: id,
                  });
                }}>
                <Image
                  source={require('../images/user.png')}
                  style={{height: 40, width: 40}}
                />
                <Text style={{color: 'black', marginLeft: 20, fontSize: 20}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Users;
