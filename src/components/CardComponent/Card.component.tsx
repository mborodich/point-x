import React from 'react';
import { StyleSheet, View, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import {
  Text,
  Image, Card
} from 'react-native-elements';
import CardFlip from 'react-native-card-flip';


const qrCode = require('../../assets/img/qr-code.png');
const opacityLogo = require('../../assets/img/OpacityLogo.png');

type TProps = {
  tokenBalance?: number;
  computedBalance?: number;
  lastDigits?: number;
};

const cardDots = `···· ···· ···· ···· ···· ···· ···· ···· ···· `;

export class CardComponent extends React.PureComponent<TProps> {



  public render() {
    const { tokenBalance = 5.6, lastDigits = 3136, computedBalance  = 5.6 } = this.props;

    return (
      <CardFlip style={styles.container} ref={(card) => this.card = card} >
        <TouchableOpacity style={styles.rootContainer} onPress={() => this.card.flip()}>
          <ImageBackground style={styles.bgContainer} source={opacityLogo} imageStyle={styles.bgImg}>
            <Image style={styles.qrcode} containerStyle={{ left: 10, top: 10 }} source={qrCode} />
            <Text style={styles.title}>{tokenBalance} <Text style={{ fontSize: 24 }}>PNTX</Text></Text>
            <Text style={styles.subtitle}>{computedBalance} <Text style={{ fontSize: 12 }}>EURO</Text></Text>
            <Text style={styles.digits}>{cardDots}<Text style={{fontSize: 12}}>{lastDigits}</Text></Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rootContainer} onPress={() => this.card.flip()}>
          <ImageBackground style={styles.bgContainer} source={opacityLogo} imageStyle={styles.bgImg}>
            <Image style={styles.qrCodeBack} containerStyle={{ left: 10, top: 10 }} source={qrCode} />
            <View>
              <Text style={styles.publicKeyText}>Public Key</Text>
            </View>
            <Text style={styles.digits}>{cardDots}<Text style={{fontSize: 12}}>{lastDigits}</Text></Text>
          </ImageBackground>
        </TouchableOpacity>
      </CardFlip>
    );
  }
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: 174,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    height: 174,
    borderRadius: 16,
    backgroundColor: '#222',
    marginHorizontal: 20,
    marginTop: 30,
    backfaceVisibility: 'hidden',
  },
  qrcode: {
    width: 32,
    height: 32,
    marginLeft: 10
  },
  qrCodeBack: {
    width: 88,
    height: 88,
    marginLeft: 10
  },
  publicKeyText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 28,
    color: '#999'
  },
  bgContainer: {
    flex: 1
  },
  bgImg: {
    top: 7,
    left: 210,
    width: 140,
    height: 168,
  },
  title: {
    marginLeft: 10,
    marginTop: 30,
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold'
  },
  subtitle: {
    marginLeft: 10,
    color: '#999',
    fontSize: 18,
    fontWeight: 'normal'
  },
  digits: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 28,
    color: '#999',
    textAlign: 'center'
  }
});
