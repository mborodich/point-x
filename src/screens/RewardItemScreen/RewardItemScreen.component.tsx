import React from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { CompanyLabel, ProgressBar } from '../../components';
import {getMocksByName} from "@app/utils";


interface Props {
  navigation: {navigate: any, goBack: any, item}
}


const qrCode = require('../../assets/img/qr-code.png');

@observer
export class RewardItemScreen extends React.PureComponent<Props> {
  @observable _isFetching : boolean = false;
  @observable qrCode : string | null = null;

  @action.bound async getReward() {
    this._isFetching = true;
    setTimeout(() => {
      this._isFetching = false;
      this.qrCode = qrCode;
    }, 2000);
  }

  private _renderOverlayLoading () : JSX.Element {
      return (
        <ActivityIndicator size="small"  color="black" style={styles.overlayLoader}/>
      )
  };

  private _renderNote () : JSX.Element {
    return (
      <Text style={{ ...styles.noteText, width: this.qrCode ? 193 : 350 }}>
        <Text style={{ color: '#3785F7' }}>Note:</Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
      </Text>
    );
  }

  private navigateToDetail = () =>
    this.props.navigation.navigate('PartnerScreen', { partner: getMocksByName(this.props.route.params.reward.company)});


  public render() {
    const reward = this.props.route.params.reward;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.img} source={{ uri: reward.image }}>
          <TouchableOpacity onPress={this.props.navigation.goBack} style={{ width: 48, height: 48, top: 10 }}>
            <Icon type="material" name="chevron-left"/>
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ height: 237 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16 }}>
            <Text style={styles.price}>{reward.value} Tokens</Text>
            <CompanyLabel company={reward.company} expiration={reward.expiration} logo={getMocksByName(reward.company).image} onPress={this.navigateToDetail} />
          </View>
          <View style={{ alignItems: 'flex-start', margin: 16 }}>
            <Text style={styles.desc}>{reward.description}</Text>
            <View style={{ marginLeft: 4, marginTop: 16 }}>
              <ProgressBar
                totalAmount={170}
                amountLeft={50}
                unfilledColor="#E0E0E0"
                borderWidth={0}
                width={95}
                height={2}
              />
            </View>
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
            disabled={this._isFetching}
            onPress={this.getReward}
            buttonStyle={styles.btn}
            titleStyle={styles.btnTitle}
            disabledStyle={styles.btnLoading}
            containerStyle={styles.btnContainer}
            title="Next"
          />
          {this._isFetching && this._renderOverlayLoading()}
        </View> }
      </SafeAreaView>
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
  overlayLoader: {
    position:'absolute',
    elevation: 1,
    left:0,
    right:0,
    bottom:0,
    top:0
  }
});
