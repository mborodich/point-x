import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Image
} from 'react-native-elements';


const QRcode = require('../../assets/svg/qrcode.svg');

export class CardComponent extends React.PureComponent {
  public render() {
    return (
      <View style={styles.container}>
        <Image style={styles.qrcode} src={QRcode} />
        <Text style={styles.title}>5.6 PNTX</Text>
        <Text style={styles.subtitle}>5.6 EURO</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 174,
    borderRadius: 16,
    backgroundColor: '#222',
    marginHorizontal: 20,
    marginTop: 60,
  },
  qrcode: {
    left: 10,
    top: 10,
    width: 32,
    height: 32
  },
  title: {
    marginLeft: 10,
    marginTop: 30,
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',

  },
  subtitle: {
    marginLeft: 10,
    marginTop: 10,
    color: '#999',
    fontSize: 18,
    fontWeight: 'normal',
  },

});
