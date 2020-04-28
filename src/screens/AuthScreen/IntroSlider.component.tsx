import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

type TSlide = {
  caption: string;
  desc: string;
};

const slides : TSlide[] = [
  {caption: '', desc: ''},
  {caption: '', desc: ''},
  {caption: '', desc: ''},
  {caption: '', desc: ''},
  {caption: '', desc: ''}
];

type TProps = {
  onDone: () => void;
};

const IntroSlider = ({onDone} : TProps) => {
  const _keyExtractor = (item: TSlide, idx) : string => idx.toString();
  const _renderItem = ({item}: {item: TSlide}) : JSX.Element => {
    return (
      <View>
        <Text>{item.caption}</Text>
        <Text>{item.desc}</Text>
      </View>
    );
  };

  return (
    <View style={styles.sliderContainer}>
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
