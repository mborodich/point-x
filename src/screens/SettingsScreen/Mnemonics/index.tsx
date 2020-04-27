import React from 'react';
import {StyleSheet, View} from 'react-native';

import { Header, Icon, Text } from 'react-native-elements';
import { Input } from '@app/components';


type TProps = {
  navigation: { navigate: any; goBack: any; };
};

const copyIcon = require('@app/assets/img/copy.png');

export const Mnemonics = React.memo(({ navigation }: TProps) : JSX.Element => {
  const mockMnemonics = 'dust turn excite exercise space light now divert idle include bird arrow';


  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Mnemonics' }}
        leftComponent={{ icon: 'chevron-left', type: 'material', onPress: navigation.goBack }}
        backgroundColor="#fff"
      />
      <View style={styles.mnemonicsContainer}>
        <Input
          value={mockMnemonics}
          inputStyle={{ marginBottom: 15 }}
          disabledInputStyle={{ color: '#4F4F4F', opacity: 1 }}
          disabled
          multiline
        />
        <View style={styles.copyContainer}>
          <Text style={styles.copyText}>Copy</Text>
          <Icon
            type="font-awesome"
            name="copy"
            size={16}
            color="#BDBDBD"
            containerStyle={styles.copyIcon}
            style={styles.copyIcon}
          />
        </View>
      </View>
    </View>
  );
});

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
