import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, InputProps} from 'react-native-elements';

interface TProps extends InputProps {
}

const Input_ = (props: TProps) => {
  const { containerStyle, ...rest } = props;
  return (
    <Input
      containerStyle={{
        ...styles.rootInputContainer,
        ...containerStyle as object
      }}
      inputStyle={{
        color: '#BDBDBD'
      }}
      placeholderTextColor="#BDBDBD"
      {...rest}
    />
  );
};


const styles = StyleSheet.create({
  rootInputContainer: {
    width: 355,
    // position: 'relative',
    // left: 20
  }
});

export default Input_;
