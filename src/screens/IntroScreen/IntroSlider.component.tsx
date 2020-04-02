import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


type TSlide = {
  image: string;
};

const slides : TSlide[] = [
  {image: '../../assets/img/intro-1.png'},
  {image: '../../assets/img/intro-2.png'},
  {image: '../../assets/img/intro-3.png'},
  {image: '../../assets/img/intro-4.png'},
];

type TProps = {
  onDone: () => void;
};

const IntroSlider = ({ onDone } : TProps) : JSX.Element => {
  const renderItem = React.useCallback((path : string) => {
    const src = require(path);
    return (
      <View style={styles.slide}>
        <Image
          style={styles.image}
          source={src}
        />
      </View>
    )
  }, [slides]);


  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <AppIntroSlider
        renderItem={renderItem}
        slides={slides}
        onDone={onDone}
        onSkip={onDone}
      />
    </>
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
    height: 350
  }
});


export default IntroSlider;
