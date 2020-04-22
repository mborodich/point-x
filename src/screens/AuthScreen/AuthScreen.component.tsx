import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';

import AuthWizard from './AuthWizard.component';
import IntroSlider from './IntroSlider.component';
import PhoneForm from './PhoneForm/';
import SmsForm from './SmsForm/';
import NewAccForm from './NewAccForm/';
import LoginForm from './LoginForm/';

import {defaultGradient, deviceWidth, deviceHeight} from '@app/utils/const';

interface LoginScreenProps {
  navigation: { navigate: any }
}

@observer
export class LoginScreen extends React.Component<LoginScreenProps> {
  state = {
    initialIndex : 0
  };

  onCarouselDone = async () : Promise<void> => {
    await AsyncStorage.setItem('@carouselViewed', true.toString());
    this.setState({ initialIndex: 1 });
  };

  onLogin = () => this.props.navigation.navigate('Application');

  async componentDidMount(): Promise<void> {
    const carouselViewed = await AsyncStorage.getItem('@carouselViewed');
    this.setState({ initialIndex: Boolean(carouselViewed) ? 1 : 0 });

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
            <NewAccForm navigation={this.props.navigation} />
          </AuthWizard.Step>
          <AuthWizard.Step
            switchText="Registration"
            switchIdx={1}
            note
            flowSwitch
          >
            <LoginForm navigation={this.props.navigation} onLogin={this.onLogin} />
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
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  stepContainer: {
    position: 'relative',
    top: 350
  }
});
