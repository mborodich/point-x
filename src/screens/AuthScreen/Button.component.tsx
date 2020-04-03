import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {StyleSheet} from 'react-native';


interface TProps extends ButtonProps {
  buttonStyle?: object;
  containerStyle?: object;
  titleStyle?: object;
}

const Button_ = (props: TProps) => {
  const {
    buttonStyle = {},
    containerStyle = {},
    titleStyle = {}
  } = props;
  return (
    <Button
      buttonStyle={{
        ...styles.rootButtonStyle,
        ...buttonStyle
      }}
      titleStyle={{
        ...styles.rootTitleStyle,
        ...titleStyle
      }}
      containerStyle={containerStyle}
      title={props.title}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  rootButtonStyle: {
    backgroundColor: '#FF375F',
    width: 330,
    height: 48,
    borderRadius: 8
  },
  rootTitleStyle: {
    color: '#ffffff',
    fontWeight: '600'
  }
});

export default Button_;
