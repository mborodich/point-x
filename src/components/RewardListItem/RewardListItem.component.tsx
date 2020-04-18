import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {ProgressBar, CompanyLabel, RewardPrice} from '..';
import {TReward} from '../../screens/RewardsScreen/RewardsScreen.component';
import {deviceWidth} from "../../utils/const";

type TProps = {
  item: TReward;
  navigation: { navigate: any };
  onPress: () => any;
};

export const RewardListItem = ({ item, onPress, navigation }: TProps) : JSX.Element => {
  const onCompanyPress = React.useCallback(() => navigation.navigate('PartnerScreen'), [item]);

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
        containerStyle: styles.avatarListItem
      }}
      title={item.title}
      subtitle={_renderItemsLeft()}
      rightTitle={<RewardPrice {...item} />}
      rightSubtitle={<CompanyLabel onPress={onCompanyPress} {...item} />}
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
    backgroundColor: '#F8F8F8'
  },
  listItemTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    color: '#4F4F4F',
    marginBottom: 10
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
    borderColor: '#F2F2F2'
  },
  progressBarContainer: {
    flex: 1,
    top: 10
  }
});
