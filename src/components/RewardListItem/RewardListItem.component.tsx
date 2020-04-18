import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {ProgressBar, CompanyLabel, RewardPrice} from '@app/components';
import {TReward} from '@app/screens/RewardsScreen/RewardsScreen.component';
import {deviceWidth} from '@app/utils/const';
import {getMocksByName} from "@app/utils";

type TProps = {
  item: TReward;
  navigation: { navigate: any };
};

export const RewardListItem = ({ item, navigation }: TProps) : JSX.Element => {
  const onCompanyPress = React.useCallback(() => navigation.navigate('PartnerScreen', { partner: getMocksByName(item.company) }), [item]);
  const onPress = React.useCallback(() => navigation.navigate('RewardItemScreen', { reward: getMocksByName(item.company).rewards[0] }), [item]);

  const _renderItemsLeft = React.useCallback(() : JSX.Element => {
    return (
      <View style={styles.progressBarContainer}>
        <ProgressBar
          unfilledColor="#E0E0E0"
          width={95}
          height={2}
          borderWidth={0}
          {...item}
        />
      </View>
    );
  }, [item]);

  return (
    <ListItem
      containerStyle={styles.listItemContainer}
      leftAvatar={{
        rounded: false,
        source:{
          uri: item.image
        },
        containerStyle: styles.avatarListItem,
        overlayContainerStyle: { backgroundColor: '#F8F8F8' },
        size: 56,
        imageProps: { borderRadius: 8 }
      }}

      title={item.title}
      subtitle={_renderItemsLeft()}
      rightTitle={<RewardPrice {...item}  />}
      rightSubtitle={<CompanyLabel {...item} logo={getMocksByName(item.company).image} onPress={onCompanyPress} />}
      titleStyle={styles.listItemTitle}
      rightTitleStyle={styles.listItemPrice}
      onPress={onPress}
      bottomDivider
    />
  );
};


const styles = StyleSheet.create({
  listItemContainer: {
    width: deviceWidth,
    height: 64,
    // marginTop: 8.5,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 7
  },
  listItemTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    color: '#4F4F4F',
  },
  listItemPrice: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: '#4F4F4F',
    textTransform: 'capitalize',
    marginBottom: 10
  },
  avatarListItem: {
    width: 56,
    height: 56,
    backgroundColor:'#fff'
  },
  progressBarContainer: {
    flex: 1,
    top: 10
  }
});
