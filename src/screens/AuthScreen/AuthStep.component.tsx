import React from 'react';
import {SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

export type TProps = {
  children: JSX.Element | JSX.Element[];
  nextStep: () => void;
  setIndex: (v : number) => void;
  header?: boolean;
  note?: boolean;
  flowSwitch?: boolean;
  switchText?: string;
  switchIdx?: number;
};

const AuthStep = (props: TProps) => {
  const { children, switchIdx, switchText, setIndex, flowSwitch = false, note = false, header = true } = props;

  const renderHeader = React.useCallback(() => {
    const logo = require('../../assets/img/logo.png');
    return (
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.captionText}>
          PointX{'\n'}
          <Text style={styles.rewardText}>
            Blockchain Rewards{'\n'}
            Program
          </Text>
        </Text>
      </View>
    )
  }, [header]);

  const renderNote = React.useCallback(() => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteCaption}>
        Note:
      </Text>
      <Text style={styles.noteContent}>
        To fully use the application, you need to pass KYC/AML verification.
      </Text>
    </View>
  ), [note]);

  const renderSwitcher = React.useCallback(() => (
    <View style={{ marginTop: 32, marginBottom: 29 }}>
      <TouchableOpacity onPress={() => setIndex(switchIdx as number)}>
        <Text style={styles.flowSwitcher}>
          {switchText}
        </Text>
      </TouchableOpacity>
    </View>
  ), [flowSwitch]);

  return (
    <SafeAreaView style={{ ...styles.container }}>
      {header && renderHeader()}
      {React.cloneElement(children as JSX.Element, props)}
      {note && renderNote()}
      {flowSwitch && renderSwitcher()}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  captionText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 28,
    marginTop: 15
  },
  rewardText: {
    fontWeight: '400',
    fontSize: 26,
    color: '#ffffff',
  },
  logoContainer: {
    position: 'relative',
    top: '8%',
  },
  logo: {
    width: 67,
    height: 80
  },
  noteContainer: {
    marginTop: 16
  },
  noteCaption: {
    color: '#2F80ED',
  },
  noteContent: {
    marginTop: 15,
    color: 'rgba(255, 255, 255, 0.5);'
  },
  flowSwitcher: {
    color: '#2F80ED',
    textAlign: 'center',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: 15
  }
});


export default AuthStep;
