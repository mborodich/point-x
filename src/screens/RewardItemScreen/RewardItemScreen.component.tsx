import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { CompanyLabel, ProgressBar, RewardPrice } from '@app/components';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import { Partner } from '@app/shared/types';

interface Props extends DrizzleProps {
  navigation: {navigate: any, goBack: any}
}
const qrCode = require('../../assets/img/qr-code.png');

@observer
@Drizzle
export class RewardItemScreen extends React.PureComponent<Props> {
  @observable private _isFetching : boolean = false;
  @observable private qrCode : string | null = null;
  @observable private _partner: Partner = {
    account: '',
    name: '',
    description: '',
    logo: '',
    number: 0
  };

  @action.bound async getReward(): Promise<void> {
    this._isFetching = true;
    const { pointX, route } = this.props;
    await pointX.completeReward(route.params.reward.number);
    this._isFetching = false;
  }

  private navigateToDetail = () => {
    const reward = this.props.route.params.reward;
    const { partner } = reward;
    this.props.navigation.navigate('PartnerScreen', { partner });
  };


  public render() {
    const reward = this.props.route.params.reward;
    const { partner } = reward;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.img} source={{ uri: reward.image }}>
          <TouchableOpacity onPress={this.props.navigation.goBack} style={{ width: 48, height: 48, top: 10 }}>
            <Icon type="material" name="chevron-left" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ height: 237 }}>
          <View style={styles.priceContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#4F4F4F', fontSize: 16, lineHeight: 19 }}>
                {reward.value}
              </Text>
              <Text style={{ fontSize: 10, lineHeight: 12, textTransform: "uppercase", color: '#828282', alignSelf: 'flex-end' }}> pntx</Text>
            </View>
            <CompanyLabel
              company={partner.name}
              expiration={reward.expirationDate}
              logo={partner.logo}
              onPress={this.navigateToDetail}
            />
          </View>
          <View style={styles.descContainer}>
            <View style={{ height: 20 }}>
              <ProgressBar
                totalAmount={170}
                amountLeft={50}
                unfilledColor="#E0E0E0"
                borderWidth={0}
                width={95}
                height={2}
              />
            </View>
            <Text style={styles.price}>{reward.caption}</Text>
            <Text style={styles.desc}>{reward.description}</Text>
          </View>
        </View>
        { this.qrCode ? <View style={styles.qrCodeContainer}>
            <Image
              width={136}
              height={136}
              source={this.qrCode}
            />
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

  private _renderNote = (): JSX.Element => {
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
  priceLabel: {
    fontSize: 10,
    lineHeight: 12
  },
  descContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 16
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16
  },
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
  },
  placeholderTile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
