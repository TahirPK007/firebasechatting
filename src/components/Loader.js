import {View, Text, Modal, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
