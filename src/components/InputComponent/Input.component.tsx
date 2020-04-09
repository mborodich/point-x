import React from 'react';
import {StyleSheet} from 'react-native';
import {Input as Input_, InputProps} from 'react-native-elements';

interface TProps extends InputProps {
}

export const Input = (props: TProps) => {
  const { containerStyle, inputStyle, ...rest } = props;
  return (
    <Input_
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
    width: '100%', // have to add, idk why this input is incorrectly sized in RN
    // position: 'relative',
    // left: 20
  }
});

export default Input_;
