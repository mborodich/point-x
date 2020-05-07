import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import { calcRest } from '../../utils';
import { PROGRESS_COLORS } from "../../utils/const";


interface TProps extends Progress.BarPropTypes {
  totalAmount: number;
  amountLeft: number;
  withCaption?: boolean;
  containerStyle?: object;
}

export const ProgressBar = (props: TProps) : JSX.Element => {
  const { totalAmount, amountLeft, withCaption = true, ...barProps } = props;


  const percent = React.useMemo(() => {
    return calcRest(amountLeft, totalAmount) / 100;
  }, [totalAmount, amountLeft]);

  const color = React.useMemo(() => {
    if (percent <= 0.2) return PROGRESS_COLORS.secondary;
    return PROGRESS_COLORS.default;
  }, [amountLeft, percent]);

  if (!totalAmount || !amountLeft) {
    return <Progress.Bar progress={percent} {...barProps} />;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      { withCaption && <Text style={styles.textStyle}>{amountLeft} of {totalAmount} items left</Text> }
      <Progress.Bar
        progress={percent}
        color={color}
        {...barProps}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStyle: {
    fontSize: 8,
    lineHeight: 12,
    color: '#828282',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },

});
