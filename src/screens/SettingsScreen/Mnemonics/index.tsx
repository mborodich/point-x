import React from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Header, } from 'react-native-elements';
import { MnemonicArea } from '@app/components';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';


interface TProps extends DrizzleProps {
  navigation: { navigate: any; goBack: any; };
}


@observer
@Drizzle
export class Mnemonics extends React.Component<TProps> {
  @observable mnemonic!: string;

  async componentDidMount() {
    const mnemonic = await AsyncStorage.getItem('@login');
    this.mnemonic = mnemonic || '';
  }

  public render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Mnemonics' }}
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          backgroundColor="#fff"
        />
        <MnemonicArea mnemonic={this.mnemonic} containerStyle={styles.mnemonicsContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mnemonicsContainer: {
    marginTop: 60
  },
});
