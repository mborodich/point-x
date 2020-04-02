import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

import IntroSlider from './IntroSlider.component';

import { View, StyleSheet, Text, Image } from "react-native";

interface LoginScreenProps {
  navigation: { navigate: any }
}

export class LoginScreen extends React.Component<LoginScreenProps> {
  state = {
    carouselViewed: false
  };

  setCarouselViewed() : Promise<void> {
    return AsyncStorage.setItem('@carouselViewed', '1');
  }

  renderCarousel() : JSX.Element {
    return (
      <IntroSlider onDone={this.onCarouselDone}/>
    )
  }

  async onCarouselDone() : Promise<void> {
    await this.setCarouselViewed();
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

    return (
      <LinearGradient
        colors={["#383838", "#131313"]}
        start={{x: 0.20, y: 0.95}}
      >
        <View style={styles.container}>
          <View>
            <Image source={require('../../assets/img/logo.png')} style={styles.logo} /> {/* todo: add these assets */}
            <Text style={styles.captionText}>
              PointX
              Blockchain Rewards
              Program
            </Text>
          </View>
          {this.state.carouselViewed ? this.renderCarousel() : null}
        </View>
      </LinearGradient>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  captionText: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 28
  },
  logo: {
    width: 82,
    height: 82
  }
});
