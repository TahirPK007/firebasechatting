import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const Main = () => {
  const [selectedtab, setselectedtab] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {selectedtab == 0 ? <Users /> : <Setting />}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 70,
          backgroundColor: 'purple',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setselectedtab(0);
          }}>
          <Image
            source={require('../images/user.png')}
            style={{
              height: 50,
              width: 50,
              tintColor: selectedtab == 0 ? 'black' : 'white',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setselectedtab(1);
          }}>
          <Image
            source={require('../images/settings.png')}
            style={{
              height: 50,
              width: 50,
              tintColor: selectedtab == 1 ? 'black' : 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
