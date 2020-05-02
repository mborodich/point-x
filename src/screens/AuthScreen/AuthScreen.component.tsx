import React from 'react';
// @ts-ignore
import * as bip39 from 'react-native-bip39';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import { observer } from 'mobx-react';
import { observable, } from 'mobx';
import { StyleSheet } from 'react-native';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';

import AuthWizard from './AuthWizard.component';
import IntroSlider from './IntroSlider.component';
import PhoneForm from './PhoneForm/';
import SmsForm from './SmsForm/';
import NewAccForm from './NewAccForm/';
import LoginForm from './LoginForm/';
import { Mnemonics } from './Mnemonics_/index';

import { defaultGradient, deviceWidth, deviceHeight } from '@app/utils/const';

interface LoginScreenProps extends DrizzleProps {
  navigation: { navigate: any }
}

@observer
@Drizzle
export class LoginScreen extends React.Component<LoginScreenProps> {
  @observable initialIndex: number = 0;

  state = {
    initialIndex: 0
  };

  onCarouselDone = async (): Promise<void> => {
    await AsyncStorage.setItem('@carouselViewed', true.toString());
    this.initialIndex = 1;
  };

  toApp = () : void =>
    this.props.navigation.navigate('Application');

  onLoginSubmit = async (v: string) : Promise<void> => {
    try {
      await this.props.pointX.handleMnemonic(v);
      this.toApp();
    } catch (error) {
      throw error; // todo: error handle
    }
  };

  onNewUserSubmit = async (name: string) : Promise<void> => {
    try {
      await this.props.pointX.createNewUserWithMnemonic(name);
      this.toApp();
    } catch (error) {
      throw error; // todo: error handle
    }
  };

  async componentDidMount(): Promise<void> {
    this.props.pointX.prefetchAll();
    const carouselViewed = await AsyncStorage.getItem('@carouselViewed');
    const viewed = Boolean(carouselViewed) ? 1 : 0;
    if (viewed) {
      this.setState({
        initialIndex: 1
      })
    }
    const login = await AsyncStorage.getItem('@login');
    if (login) {
      await this.props.pointX.handleMnemonic(login);
      this.props.navigation.navigate('Application');
    }
    SplashScreen.hide();
  }

  public render() {
    return (
      <LinearGradient
        colors={defaultGradient}
        style={styles.rootContainer}
      >
        <AuthWizard initialIndex={this.state.initialIndex}>
          <AuthWizard.Step>
            <IntroSlider onDone={this.onCarouselDone} />
          </AuthWizard.Step>
          <AuthWizard.Step
            switchText="Log In"
            switchIdx={4}
            note
            flowSwitch
          >
            <PhoneForm />
          </AuthWizard.Step>
          <AuthWizard.Step
            header={false}
            flowSwitch={false}
          >
            <SmsForm />
          </AuthWizard.Step>
          <AuthWizard.Step
            header={false}
            flowSwitch={false}
          >
            <NewAccForm
              onNewUserSubmit={this.onNewUserSubmit}
            />
          </AuthWizard.Step>
          <AuthWizard.Step
            switchText="Registration"
            switchIdx={1}
            note
            flowSwitch
          >
            <LoginForm
              onSubmit={this.onLoginSubmit}
            />
          </AuthWizard.Step>
        </AuthWizard>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  rootContainer: {
    width: deviceWidth,
    height: deviceHeight,
    // paddingVertical: 10,
    // paddingHorizontal: 32,
  },
  stepContainer: {
    position: 'relative',
    top: 350
  }
});
