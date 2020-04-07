import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

type TSlide = {
  key: number;
  image: string;
};

const slides : TSlide[] = [
  {key: 1, image: require('../../assets/img/intro-1.png')},   // todo: replace with right picture from mockup
  {key: 2, image: require('../../assets/img/intro-2.png')},
  {key: 3, image: require('../../assets/img/intro-3.png')},
  {key: 4, image: require('../../assets/img/intro-4.png')},
  {key: 5, image: require('../../assets/img/intro-5.png')}
];

type TProps = {
  onDone: () => void;
};

const IntroSlider = ({onDone} : TProps) => {


  const _keyExtractor = (item: TSlide) => `${item.key}`;

  const _renderItem = ({item}: {item: TSlide}) => {
    return (
      <View>
        <Image source={item.image} />
      </View>
    );
  };
  return (
    <View style={styles.sliderContainer}>
      <AppIntroSlider
        keyExtractor={(item : TSlide) => item.key.toString()}
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
    </View>
  );
};



const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2);',
    width: 7,
    height: 7
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 1);',
    width: 7,
    height: 7
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 70
  },
});


export default IntroSlider;
