import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {
  Text,
  Image
} from 'react-native-elements';
import CardFlip from 'react-native-card-flip';


const qrCode = require('@app/assets/img/qr-code.png');
const opacityLogo = require('@app/assets/img/OpacityLogo.png');
const copyIcon = require('@app/assets/img/copy.png');


type TProps = {
  tokenBalance?: number;
  computedBalance?: number;
  lastDigits?: number;
  publicKey?: string;
};

const cardDots = `···· ···· ···· ···· ···· ···· ···· ···· ···· `;

export class CardComponent extends React.PureComponent<TProps> {



  public render() {
    const {
      tokenBalance = 5.6,
      lastDigits = 3136,
      computedBalance  = 5.6,
      publicKey = '0x 2133 8334 d837 526e 16d3 7014 8dbf 7234 be45 839c'
    } = this.props;

    return (
      <CardFlip style={styles.rootContainer} ref={(card) => this.card = card} >
        <TouchableOpacity style={styles.container} onPress={() => this.card.flip()}>
          <ImageBackground style={styles.bgContainer} source={opacityLogo} imageStyle={styles.bgImg}>
            <Image style={styles.qrcode} containerStyle={{ left: 10, top: 10 }} source={qrCode} />
            <Text style={styles.title}>{tokenBalance} <Text style={{ fontSize: 24 }}>PNTX</Text></Text>
            <Text style={styles.subtitle}>{computedBalance} <Text style={{ fontSize: 12 }}>EURO</Text></Text>
            <Text style={styles.digits}>{cardDots}<Text style={{fontSize: 12}}>{lastDigits}</Text></Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => this.card.flip()}>
          <ImageBackground style={styles.bgContainer} source={opacityLogo} imageStyle={styles.bgImg}>
            <Image style={styles.qrCodeBack} containerStyle={{ left: 10, top: 10 }} source={qrCode} />
            <View style={styles.actionsContainer}>
              <View style={styles.copyContainer}>
                <Text style={styles.publicKeyCaptionText}>Public Key</Text>
                <Image
                  source={copyIcon}
                  style={styles.copyIcon}
                />
              </View>
              <View style={styles.keyContainer}>
                <Text style={styles.publicKeyContent}>{publicKey}</Text>
              </View>
            </View>
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
    marginHorizontal: 20,
    marginTop: 30,
  },
  container: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#222',
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
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  copyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 24,
    paddingLeft: 8,
    paddingRight: 8
  },
  publicKeyContent: {
    fontSize: 12,
    lineHeight: 14,
    color: '#ffffff',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  publicKeyCaptionText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 28,
    color: '#999',
    zIndex: 99
  },
  copyIcon: {
    width: 16,
    height: 16
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
  keyContainer: {
    backgroundColor: '#333',
    maxWidth: 350,
    marginLeft: 10,
    marginBottom: 16,
    maxHeight: 16,
    opacity: 0.8,
    alignItems: 'center'
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
    textAlign: 'center',
    alignSelf: 'center'
  }
});
