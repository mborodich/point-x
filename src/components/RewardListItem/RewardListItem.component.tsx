import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import {ListItem} from 'react-native-elements';
import {ProgressBar, CompanyLabel, RewardPrice} from '@app/components';
import {deviceWidth} from '@app/utils/const';
import {Reward, Partner} from "@app/shared/types";

type TProps = {
  item: Reward;
  partner: Partner;
  navigation: { navigate: any };
};

export const RewardListItem = React.memo(observer(({ item, partner, navigation }: TProps) : JSX.Element => {
  const onCompanyPress = React.useCallback(() => navigation.navigate('PartnerScreen', { partner }), [item]);
  const onPress = React.useCallback(() => navigation.navigate('RewardItemScreen', { reward: item }), [item]);

  const _renderItemsLeft = React.useCallback(() : JSX.Element => {
    return (
      <View style={styles.progressBarContainer}>
        <ProgressBar
          unfilledColor="#E0E0E0"
          width={95}
          height={2}
          borderWidth={0}
          totalAmount={item && item.totalAmount}
          amountLeft={item && item.resultsAmount}
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
      title={item.caption}
      subtitle={_renderItemsLeft()}
      rightTitle={<RewardPrice {...item}  />}
      rightSubtitle={
        <CompanyLabel
          company={partner && partner.name}
          logo={partner && partner.logo}
          expiration={item && item.expirationDate}
          onPress={onCompanyPress}
        />
      }
      titleStyle={styles.listItemTitle}
      rightTitleStyle={styles.listItemPrice}
      onPress={onPress}
      bottomDivider
    />
  );
}));

const styles = StyleSheet.create({
  listItemContainer: {
    width: deviceWidth,
    height: 64,
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
