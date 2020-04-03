import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

import { Input, Button } from 'react-native-elements';

import IntroSlider from './IntroSlider.component';

import { View, StyleSheet, Text, Image, SafeAreaView } from "react-native";

interface LoginScreenProps {
  navigation: { navigate: any }
}

export class LoginScreen extends React.Component<LoginScreenProps> {
  state = {
    carouselViewed: false
  };

  async onCarouselDone() : Promise<void> {
    await AsyncStorage.setItem('@carouselViewed', '1');
    this.setState({
      carouselViewed: true
    });
  }

  async getCarouselViewed() : Promise<boolean> {
    const val = await AsyncStorage.getItem('@carouselViewed');
    if (val !== null) {
      return !!parseInt(val);
    }
    return false;
  }

  async componentDidMount(): Promise<void> {
    const carouselViewed = await this.getCarouselViewed();
    this.setState({ carouselViewed });
    SplashScreen.hide();
  }

  public render() {
    const logo = require('../../assets/img/logo.png');

    return (
      <LinearGradient
        colors={[ "#383838", "#131313" ]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
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
          {!this.state.carouselViewed && <IntroSlider onDone={this.onCarouselDone}/>}
        </SafeAreaView>
      </LinearGradient>
    );
  }

}

/**
 <View style={styles.buttonContainer}>
 <Input placeholder='Test placeholder' style={{ justifyContent: 'center' }} placeholderTextColor='#BDBDBD' containerStyle={styles.input}/>
 <Button buttonStyle={styles.button} title='Next' />
 </View>
 <View style={styles.noteContainer}>
 <Text style={styles.noteCaption}>
 Note:
 </Text>
 <Text style={styles.noteContent}>
 To fully use the application, you need to pass KYC/AML verification.
 </Text>
 </View>
 */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  logoContainer: {
    paddingLeft: 15,
    position: 'relative',
    top: 85,
    left: 5,
    height: 185
  },
  buttonContainer: {
    top: 100,
    height: 180,
    alignItems: 'center'
  },
  noteContainer: {

  },
  captionText: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 28,
    paddingTop: 15
  },
  noteCaption: {
    color: '#2F80ED',

  },
  noteContent: {
    color: 'rgba(255, 255, 255, 0.5);'
  },
  rewardText: {
    fontWeight: '400',
    fontSize: 26,
    color: '#ffffff',
  },
  logo: {
    width: 67,
    height: 80
  },
  input: {
    width: 390,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#FF375F',
    width: 330,
    height: 48,
    borderRadius: 8
  }
});
