import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {StyleSheet} from 'react-native';


interface TProps extends ButtonProps {}

const Button_ = (props: TProps) => {
  return (
    <Button
      buttonStyle={{
        ...styles.rootButtonStyle,
        ...props.buttonStyle as object
      }}
      titleStyle={{
        ...styles.rootTitleStyle,
        ...props.titleStyle as object
      }}
      disabledStyle={{
        ...styles.rootDisabledStyle,
        ...props.disabledStyle as object
      }}
      containerStyle={props.containerStyle}
      title={props.title}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  rootButtonStyle: {
    backgroundColor: '#FF375F',
    width: 350,
    height: 48,
    borderRadius: 8
  },
  rootTitleStyle: {
    color: '#ffffff',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 18,
  },
  rootDisabledStyle: {
    opacity: 0.3,
    backgroundColor: '#FF375F'
  }
});

export default Button_;
