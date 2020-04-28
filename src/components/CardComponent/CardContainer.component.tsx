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
import LinearGradient from 'react-native-linear-gradient';
import {defaultGradient} from "@app/utils/const";

const qrCode = require('@app/assets/img/white-qr-code.png');
const cardBg = require('@app/assets/img/CardBg.png');
const smallLogo = require('@app/assets/img/WhiteSmallLogo.png');
const copyIcon = require('@app/assets/img/copy.png');

type TProps = {
  tokenBalance?: number;
  computedBalance?: number;
  lastDigits?: number;
  publicKey?: string;
};

const DOTS_COUNT = Array.from({ length: 11 });

export class CardComponent extends React.PureComponent<TProps> {

  private renderDots() {
    return DOTS_COUNT.map((_, i) => {
      return (<Text style={styles.digits}>
        ····
      </Text>)
    });
  }

  public render() {
    const {
      tokenBalance = 5600,
      lastDigits = 3136,
      computedBalance  = 5600,
      publicKey = '0x 2133 8334 d837 526e 16d3 7014 8dbf 7234 be45 839c'
    } = this.props;

    return (
      <CardFlip style={styles.rootContainer} ref={(card) => this.card = card} >
        <TouchableOpacity style={styles.container} onPress={() => this.card.flip()}>
          <LinearGradient style={styles.container} colors={defaultGradient}>
            <ImageBackground style={styles.bgContainer} source={cardBg} imageStyle={styles.bgImg}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Image style={styles.qrcode} containerStyle={{ left: 10, top: 10 }} source={qrCode} />
                <Image style={styles.smallLogo} containerStyle={{ top: 10 }} source={smallLogo} />
              </View>
              <View style={{ marginLeft: 41 }}>
                <Text style={styles.title}>{tokenBalance} <Text style={{ fontSize: 24 }}>PNTX</Text></Text>
                <Text style={styles.subtitle}>{computedBalance} <Text style={{ fontSize: 12 }}>EURO</Text></Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly' }}>
                {this.renderDots()}
                <Text style={{...styles.digits, fontSize: 12}}>{lastDigits}</Text>
              </View>
            </ImageBackground>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => this.card.flip()}>
          <LinearGradient style={styles.container} colors={defaultGradient}>
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
          </LinearGradient>
        </TouchableOpacity>
      </CardFlip>
    );
  }
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: 174,
    width: 326,
    marginLeft: 45,
    marginTop: 30,
  },
  container: {
    flex: 1,
    borderRadius: 16,
    backfaceVisibility: 'hidden',
  },
  qrcode: {
    width: 32,
    height: 32,
    marginLeft: 10
  },
  smallLogo: {
    width: 32,
    height: 32,
    marginRight: 10
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
    fontSize: 10,
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
    // top: 7,
    // left: 160,
    top: 30,
    width: 326,
    height: 144,
  },
  keyContainer: {
    backgroundColor: '#2D51C2',
    maxWidth: 300,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal'
  },
  digits: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 28,
    color: '#F2F2F2',
    textAlign: 'center',
    alignSelf: 'center'
  }
});
