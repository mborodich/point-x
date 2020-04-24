import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TProps = {
  value: number;
  containerStyle?: object;
  labelStyle?: object;
  priceStyle?: object;
}

export const RewardPrice = (props: TProps) => {
  return (
    <View style={[styles.priceContainer, props.containerStyle]}>
      <Text style={[styles.pntxLabel, props.labelStyle]}> pntx</Text>
      <Text style={[styles.itemPrice, props.priceStyle]}>{props.value}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  itemPrice: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: '#4F4F4F',
    textTransform: 'capitalize',
    marginBottom: 10
  },
  pntxLabel: {
    fontSize: 6,
    lineHeight: 7,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textTransform: "uppercase",
    color: '#828282',
    marginBottom: 7
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});
