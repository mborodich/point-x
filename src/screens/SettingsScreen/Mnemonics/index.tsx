import React from 'react';
import { StyleSheet, View, Clipboard, TouchableOpacity } from 'react-native';

import { inject, observer } from 'mobx-react';
import { Header, Icon, Text } from 'react-native-elements';
import { Input } from '@app/components';
import {UserStore} from "@app/store";


type TProps = {
  navigation: { navigate: any; goBack: any; };
  userStore: UserStore;
};

const copyIcon = require('@app/assets/img/copy.png');

@inject('userStore')
@observer
export class Mnemonics extends React.PureComponent<TProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Mnemonics' }}
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          backgroundColor="#fff"
        />
        <View style={styles.mnemonicsContainer}>
          <Input
            value={this.props.userStore.userCredentials.mnemonics}
            inputStyle={{ marginBottom: 15 }}
            disabledInputStyle={{ color: '#4F4F4F', opacity: 1 }}
            disabled
            multiline
          />
          <TouchableOpacity
            onPress={() => Clipboard.setString(this.props.userStore.userCredentials.mnemonics)}
            style={styles.copyContainer}
          >
            <Text style={styles.copyText}>Copy</Text>
            <Icon
              type="font-awesome"
              name="copy"
              size={16}
              color="#BDBDBD"
              containerStyle={styles.copyIcon}
              style={styles.copyIcon}
            />
          </TouchableOpacity>
        </View>
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
    marginTop: 60,
    margin: 24
  },
  copyContainer: {
    flexDirection: 'row',
    height: 36,
    width: 50,
    marginRight: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  copyText: {
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 12,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  copyIcon: {
  },
});
