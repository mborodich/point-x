import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ProgressBar, CompanyLabel, RewardPrice} from "..";
import {TReward} from '../../screens/RewardsScreen/RewardsScreen.component';



type TProps = {
  item: TReward
};

export const RewardGridItem = ({ item }: TProps) => {
  const _renderPrice = React.useCallback(() => (
    <View style={styles.priceContainer}>
      <Text style={styles.listItemPrice}>{item.value}</Text>
      <Text style={styles.pntxLabel}>pntx</Text>
    </View>
  ), [item]);

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.imageContainer} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {item.title}
        </Text>
      </View>
      <View style={styles.propsContainer}>
        <View>
          <ProgressBar
            unfilledColor="#E0E0E0"
            width={95}
            height={2}
            borderWidth={0}
            {...item}
          />
        </View>
        <RewardPrice {...item} />
      </View>
      <CompanyLabel {...item} />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  propsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  imageContainer: {
    width: 164,
    height: 164,
    borderRadius: 16
  }
});
