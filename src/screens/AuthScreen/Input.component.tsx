import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, InputProps} from 'react-native-elements';

interface TProps extends InputProps {
  // onChangeValue: () => void; // todo:
}

const Input_ = (props: TProps) => {
  const { containerStyle, ...rest } = props;
  return (
    <Input
      containerStyle={{
        ...styles.rootInputContainer,
        ...containerStyle as object
      }}
      {...rest}
    />
  );
};


const styles = StyleSheet.create({
  rootInputContainer: {
    width: 390,
    justifyContent: 'center'
  }
});

export default Input_;
