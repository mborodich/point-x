import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

import AuthWizard from './AuthWizard.component';
import IntroSlider from './IntroSlider.component';
import Input from './Input.component';
import Button from './Button.component';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";

interface LoginScreenProps {
  navigation: { navigate: any }
}


export class LoginScreen extends React.Component<LoginScreenProps> {
  state = {
    carouselViewed: false,
    initialIndex: 0,
    active: 'reg'
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


  setFlow(v: 'reg' | 'log') : void {
    this.setState({
      active: v
    });
  }

  renderNote() : JSX.Element {
    return (
      <View style={styles.noteContainer}>
        <Text style={styles.noteCaption}>
          Note:
        </Text>
        <Text style={styles.noteContent}>
          To fully use the application, you need to pass KYC/AML verification.
        </Text>
      </View>
    );
  }

  renderSignUp() : JSX.Element {
    return (
      <React.Fragment>
        <AuthWizard.Step
          childrenStyle={styles.stepContainer}
        >
          <Input placeholder="Phone Number"/>
          <Button title="Next" style={{ marginTop: 40 }} />
          {this.renderNote()}
          <View style={{ marginTop: 32 }}>
            <TouchableOpacity onPress={() => this.setFlow('log')}>
              <Text style={styles.flowSwitcher}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </AuthWizard.Step>
        <AuthWizard.Step header={false}>
          <Text style={{ fontSize: 16, lineHeight: 19, textAlign: 'center' }}>Code sent to number{'\n'} +371 2 6624068</Text>
          <Input style={{ marginTop: 35 }} placeholder="SMS-Code"/>
          <Button style={{ marginTop: 40 }} title="Resend 00:59"/>
        </AuthWizard.Step>
        <AuthWizard.Step header={false}>
          <Text>Create New Account</Text>
          <Input style={{ marginTop: 40 }} placeholder="Nickname" />
          <Input style={{ marginTop: 40 }} placeholder="PIN Number" />
          <Button style={{ marginTop: 40 }} title="Login" />
        </AuthWizard.Step>
      </React.Fragment>
    );
  }

  renderLogin() : JSX.Element {
    return (
      <React.Fragment>
        <AuthWizard.Step
          childrenStyle={styles.stepContainer}
        >
          <Input placeholder="Mnemonics"/>
          <Button title="Sign In" style={{ marginTop: 40 }} />
          {this.renderNote()}
          <View style={{ marginTop: 32 }}>
            <TouchableOpacity  onPress={() => this.setFlow('reg')}>
              <Text style={styles.flowSwitcher}>
                Registration
              </Text>
            </TouchableOpacity>
          </View>
        </AuthWizard.Step>
      </React.Fragment>
    );
  }


  public render() {
    return (
      <LinearGradient
        colors={[ "#383838", "#131313" ]}
        style={styles.rootContainer}
      >
        <AuthWizard>
          <AuthWizard.Step>
            <IntroSlider onDone={this.onCarouselDone} />
          </AuthWizard.Step>
          { this.state.active === 'reg' ? this.renderSignUp() : this.renderLogin() }
        </AuthWizard>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  rootContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  stepContainer: {
    position: 'relative',
    top: 350
  },
  noteContainer: {
    marginTop: 16
  },
  noteCaption: {
    color: '#2F80ED',
  },
  flowSwitcher: {
    color: '#2F80ED',
    textAlign: 'center',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  noteContent: {
    marginTop: 15,
    color: 'rgba(255, 255, 255, 0.5);'
  },
});
