import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, InputProps} from 'react-native-elements';

interface TProps extends InputProps {
}

const Input_ = (props: TProps) => {
  const { containerStyle, inputStyle, ...rest } = props;
  return (
    <Input
      containerStyle={{
        ...styles.rootInputContainer,
        ...containerStyle as object
      }}
      inputStyle={{
        color: '#BDBDBD',
        ...inputStyle as object
      }}
      placeholderTextColor="#BDBDBD"
      {...rest}
    />
  );
};


const styles = StyleSheet.create({
  rootInputContainer: {
    width: '101%', // have to add, idk why this input is incorrectly sized in RN
    // position: 'relative',
    // left: 20
  }
});

export default Input_;
