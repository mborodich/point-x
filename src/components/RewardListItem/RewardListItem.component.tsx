import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Observer } from 'mobx-react';
import { Avatar, Text } from 'react-native-elements';
import { ProgressBar, CompanyLabel } from '@app/components';
import { Reward, Partner } from "@app/shared/types";

type TProps = {
  item: Reward;
  navigation: { navigate: any };
};

export const RewardListItem = ({ item, navigation }: TProps): JSX.Element => {
  const onCompanyPress = React.useCallback(() => navigation.navigate('PartnerScreen', { partner: item.partner }), [item.partner]);
  const onPress = React.useCallback(() => navigation.navigate('RewardItemScreen', { reward: item }), [item]);

  const _renderItemsLeft = React.useCallback((): JSX.Element => {
    return (
      <View style={styles.progressBarContainer}>
        <ProgressBar
          unfilledColor="#E0E0E0"
          width={95}
          height={2}
          borderWidth={0}
          totalAmount={item.totalAmount}
          amountLeft={item.resultsAmount}
        />
      </View>
    );
  }, [item]);

  const partner = React.useMemo(() => {
    return item && item.partner;
  }, [item.partner]);

  return (
    <Observer>
      {() => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.containerRow}>
            <Avatar
              source={{ uri: item.image }}
              overlayContainerStyle={{ backgroundColor: '#F8F8F8' }}
              imageProps={{ borderRadius: 8 }}
              size={56}
            />
            <View style={styles.containerRowMiddle}>
              <Text style={styles.listItemTitle}>{item.caption}</Text>
              {_renderItemsLeft()}
            </View>
            <View style={styles.containerRowRight}>
              <View  style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 6, lineHeight: 7, textTransform: "uppercase", color: '#828282', alignSelf: 'flex-end' }}> pntx</Text>
                  <Text style={{ color: '#4F4F4F', fontSize: 14, lineHeight: 16 }}>
                    {item.value}
                  </Text>
                </View>
                {
                  item && item.completed ? <Text style={{ fontSize: 6, color: '#65C366' }}>received</Text> : null
                }
              </View>
              <CompanyLabel
                company={partner && partner.name}
                logo={partner && partner.logo}
                expiration={item && item.expirationDate}
                onPress={onCompanyPress}
              />
            </View>
          </View>
          <View style={styles.bottomDivider} />
        </TouchableOpacity>
      )}
    </Observer>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16
  },
  containerRowMiddle: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10
  },
  containerRowRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-evenly'
  },
  bottomDivider: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginLeft: 80
  },
  listItemTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    color: '#4F4F4F',
  },
  progressBarContainer: {
    top: 10
  }
});
