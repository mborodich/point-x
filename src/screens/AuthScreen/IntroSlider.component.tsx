import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

type TSlide = {
  key: number;
  image: string;
};

const slides : TSlide[] = [
  {key: 1, image: require('../../assets/img/intro-1.png')},   // todo: replace with right picture from mockup
  {key: 2, image: require('../../assets/img/intro-2.png')},   // todo: replace with right picture from mockup
  {key: 3, image: require('../../assets/img/intro-3.png')},   // todo: replace with right picture from mockup
  {key: 4, image: require('../../assets/img/intro-4.png')},   // todo: replace with right picture from mockup
  {key: 5, image: require('../../assets/img/intro-5.png')}    // todo: replace with right picture from mockup
];

type TProps = {
  onDone: () => void;
};

const IntroSlider = ({onDone} : TProps) => {


  const _keyExtractor = (item: TSlide) => `${item.key}`;

  const _renderItem = ({item}: {item: TSlide}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} />
      </View>
    );
  };

    return (
      <AppIntroSlider
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        onDone={onDone}
        onSkip={onDone}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showPrevButton={false}
        showNextButton={false}
        showSkipButton={true}
        data={slides}
        doneLabel={'Continue'}
        bottomButton
        showDoneButton
      />
  );
};



const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 350,
    height: 350,
    flex: 1
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2);',
    width: 7,
    height: 7
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 1);',
    width: 7,
    height: 7
  }
});


export default IntroSlider;
