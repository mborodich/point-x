import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ProgressBar, CompanyLabel, RewardPrice} from "@app/components";
import {TReward} from '@app/screens/RewardsScreen/RewardsScreen.component';
import {getMocksByName} from "@app/utils";

type TProps = {
  item: TReward;
  navigation: { navigate: any };
  onPress: () => any;
};

export const RewardGridItem = ({ item, navigation }: TProps) => {

  const onCompanyPress = React.useCallback(() => navigation.navigate('PartnerScreen', {partner: getMocksByName(item.company)}), [item]);
  const onPress = React.useCallback(() => navigation.navigate('RewardItemScreen', {reward: getMocksByName(item.company).rewards[0]}), [item]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.imageContainer} />
      <View>
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
      <CompanyLabel logo={getMocksByName(item.company).image} onPress={onCompanyPress} {...item} />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  titleText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#4F4F4F',
    lineHeight: 14
  },
  container: {
    padding: 15,
    maxWidth: '50%'
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
