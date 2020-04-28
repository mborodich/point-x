import React from 'react';
import {Clipboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@app/components';
import {Icon, Text} from 'react-native-elements';

type TProps = {
  mnemonic: string;
  containerStyle?: object;
};

export const MnemonicArea = React.memo((props: TProps) : JSX.Element => {
  return (
    <View style={{ ...styles.rootContainer, ...props.containerStyle }}>
      <Input
        value={props.mnemonic}
        inputStyle={{ marginBottom: 15 }}
        disabledInputStyle={{ color: '#4F4F4F', opacity: 1 }}
        disabled
        multiline
      />
      <TouchableOpacity
        onPress={() => Clipboard.setString(props.mnemonic)}
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
  );
});


const styles = StyleSheet.create({
  rootContainer: {
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
