import React from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { CompanyLabel, ProgressBar } from '@app/components';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';

interface Props extends DrizzleProps {
  navigation: {navigate: any, goBack: any}
}

type Reward = {
  caption: string;
  description: string;
  image: string;
  value: number;
  owner: string;
  status: 0 | 1;
  totalAmount: number;
  resultsAmount: number;
  number: number;
  expirationDate: number;
}

type Partner = {
  account: string;
  name: string;
  description: string;
  logo: string;
  number: number;
}


const qrCode = require('../../assets/img/qr-code.png');

@observer
@Drizzle
export class RewardItemScreen extends React.PureComponent<Props> {
  @observable private _isFetching : boolean = false;
  @observable private qrCode : string | null = null;
  @observable private _reward: Reward = {
    caption: '',
    description: '',
    image: '',
    value: '',
    owner: '',
    status: 0,
    totalAmount: 0,
    resultsAmount: 0,
    number: 0
  };
  @observable private _partner: Partner = {
    account: '',
    name: '',
    description: '',
    logo: '',
    number: 0
  };

  @action.bound async getReward() : Promise<void> {
    this._isFetching = true;
    setTimeout(() => {
      this._isFetching = false;
      this.qrCode = qrCode;
    }, 2000);
  }

  async componentDidMount() : Promise<void> {
    const { route, pointX } = this.props;
    const [
      caption,
      description,
      image,
      value,
      owner,
      status,
      totalAmount,
      resultsAmount,
      number
    ] = route.params.reward;
    pointX.fetchPartnerByAddress(owner);
    this._partner = pointX.partnerByAddress;
    Object.assign(this._reward, {
      caption,
      description,
      image,
      value,
      owner,
      status,
      totalAmount,
      resultsAmount,
      number
    });
  }

  private navigateToDetail = () =>
    this.props.navigation.navigate('PartnerScreen', { partner: this._partner });


  public render() {
    const { _reward: reward, _partner: partner } = this;

    return (
      <SafeAreaView style={styles.container}>
        {this._renderTile()}
        <View style={{ height: 237 }}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{reward.value} Tokens</Text>
            <CompanyLabel
              company={partner.logo}
              expiration={reward.expirationDate}
              logo={partner.logo}
              onPress={this.navigateToDetail}
            />
          </View>
          <View style={styles.descContainer}>
            <ProgressBar
              totalAmount={170}
              amountLeft={50}
              unfilledColor="#E0E0E0"
              borderWidth={0}
              width={95}
              height={2}
              containerStyle={{
                marginLeft: 4,
                marginTop: 16
              }}
            />
            <Text style={styles.desc}>{reward.description}</Text>
          </View>
        </View>

        { this.qrCode ? <View style={styles.qrCodeContainer}>
          <View style={{ width: 136, height: 136 }}>
            <Image
              source={this.qrCode}
            />
          </View>
          {this._renderNote()}
        </View> : <View style={styles.actionContainer}>
          {this._renderNote()}
          <Button
            loading={this._isFetching}
            onPress={this.getReward}
            buttonStyle={styles.btn}
            titleStyle={styles.btnTitle}
            disabledStyle={styles.btnLoading}
            containerStyle={styles.btnContainer}
            title="Next"
          />
        </View> }
      </SafeAreaView>
    );
  }

  private _renderTile = () : JSX.Element => (
    <ImageBackground style={styles.img} source={{ uri: this._reward.image }}>
      <TouchableOpacity onPress={this.props.navigation.goBack} style={{ width: 48, height: 48, top: 10 }}>
        <Icon type="material" name="chevron-left"/>
      </TouchableOpacity>
    </ImageBackground>
  );


  private _renderNote = () : JSX.Element => {
    return (
      <Text style={{ ...styles.noteText, width: this.qrCode ? 193 : 350 }}>
        <Text style={{ color: '#3785F7' }}>Note:</Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  img: {
    width: '100%',
    height: 375
  },
  price: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
  },
  descContainer: {
    alignItems: 'flex-start',
    margin: 16
  },
  priceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16 },
  desc: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 4,
    letterSpacing: -0.4
  },
  actionContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 200,
    backgroundColor: '#F8F8F8',
    padding: 16
  },
  qrCodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    padding: 16
  },
  noteText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
  },
  btnContainer: {
    marginLeft: 'auto',
    marginBottom: 22
  },
  btn: {
    backgroundColor: '#FF375F',
    borderRadius: 40,
    width: 148,
    height: 32
  },
  btnTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    color: '#F2F2F2'
  },
  btnLoading: {
    opacity: 0.3,
    backgroundColor: '#FF375F'
  }
});
