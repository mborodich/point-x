import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

type TSlide = {
  caption: string;
  desc: string;
};

const slides : TSlide[] = [
  {caption: 'Free Will!', desc: 'Be the man of your life!'},
  {caption: 'Receive Rewards', desc: 'Earned reward  for time spent!'},
  {caption: 'Complete the Tasks', desc: 'Perform simple tasks \n' +
      'and the world will be \n' +
      'a better place! '},
  {caption: 'Exchange\nYour\nRewards\nfor Gifts', desc: 'Swap your efforts \n' +
      'and time for\nrewards.'},
];

type TProps = {
  onDone: () => void;
};

const IntroSlider = ({onDone} : TProps) => {
  const _keyExtractor = (item: TSlide, idx) : string => idx.toString();
  const _renderItem = ({item}: {item: TSlide}) : JSX.Element => {
    return (
      <View style={{ justifyContent: 'center', flex: 1, marginBottom: 150 }}>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.subtitle}>{item.desc}</Text>
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
  caption: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 72,
    lineHeight: 68,
    letterSpacing: -0.4,
    color: '#D4ECFF'
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 35,
    lineHeight: 34,
    color: '#fff',
    letterSpacing: -0.4,
    alignSelf: 'flex-end'
  }
});


export default IntroSlider;
