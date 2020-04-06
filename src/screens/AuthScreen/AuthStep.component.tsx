import React from 'react';
import {SafeAreaView, View, StyleSheet, Image, Text} from 'react-native';

export type TProps = {
  children: JSX.Element | JSX.Element[],
  header?: boolean,
  childrenStyle?: object
};

const AuthStep = ({children, childrenStyle, header = true} : TProps) => {
  const renderHeader = React.useCallback(() => {
    const logo = require('../../assets/img/logo.png');
    return (
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.captionText}>
          PointX {'\n'}
          <Text style={styles.rewardText}>
            Blockchain Rewards{'\n'}
            Program
          </Text>
        </Text>
      </View>
    )
  }, []);

  return (
    <SafeAreaView style={{ ...styles.container }}>
      {header && renderHeader()}
      <View style={childrenStyle}>
        {children}
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {  },
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
    // flex: 0.5,
    // paddingLeft: 15,
    position: 'relative',
    top: 102,
    // left: 5,
  },
  logo: {
    width: 67,
    height: 80
  }
});


export default AuthStep;
