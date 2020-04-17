import React from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { CompanyLabel, ProgressBar } from '../../components';


interface Props {
  navigation: {navigate: any, goBack: any}
}

@observer
export class RewardItemScreen extends React.PureComponent<Props> {
  @observable isFetching : boolean = false;
  @observable qrCode : string = '';

  @action.bound async getReward() {
    // handle get reward
  }

  @action.bound async handleBack() {
    // handle back button click
  }

  // todo: NAVIGATION STACK REFACTOR !!! TO REMOVE BOTTOM TAB
  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.img} source={{ uri: `https://picsum.photos/200/200?random=1${Math.random()}` }}>
          <TouchableOpacity onPress={this.props.navigation.goBack} style={{ width: 48, height: 48, top: 10 }}>
            <Icon type="material" name="chevron-left"/>
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ height: 237 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16 }}>
            <Text style={styles.price}>170 Tokens</Text>
            <CompanyLabel company="Starbucks" expiration="Nov 21." />
          </View>
          <View style={{ alignItems: 'flex-start', margin: 16 }}>
            <Text style={styles.price}>Apple Watch Series 3</Text>
            <Text style={styles.desc}>корпус из серебристого алюминия.
              с основными функциями, чтобы следить за здоровьем, отслеживать тренировки и оставаться на связи.
              В корпусе 42 мм или 38 мм.</Text>
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
        <View>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
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
  }
});
