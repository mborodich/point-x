import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Header } from 'react-native-elements';
import { defaultGradient } from '@app/utils/const';

import { Button, MnemonicArea } from '@app/components';
import {observable} from "mobx";
import {observer} from "mobx-react";


type TProps = {
  onOkClick: () => void;
};

const HEADER = {
  text: 'Mnemonics',
  style: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal'
  }
};

@observer
export default class Mnemonics extends React.PureComponent<TProps> {
  @observable mnemonic!: string;

  async componentDidMount() {
    const mnemonic = await AsyncStorage.getItem('@login');
    this.mnemonic = mnemonic || '';
  }

  public render() {
    return (
      <LinearGradient colors={defaultGradient} style={styles.container}>
        <Header
          centerComponent={HEADER}
        />
        <View style={styles.content}>
          <MnemonicArea
            mnemonic={this.mnemonic}
          />
          <Button
            title="OK"
            onPress={this.props.onOkClick}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  }
});
