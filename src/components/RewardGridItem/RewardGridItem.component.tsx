import React from 'react';
import { Observer } from 'mobx-react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { ProgressBar, CompanyLabel, RewardPrice } from '@app/components';

type Reward = {
  caption: string;
  description: string;
  image: string;
  value: number;
  owner: string;
  status: 0 | 1;
  totalAmount: number;
  resultsAmount: number;
  number: number;
  expirationDate: number;
}

type Partner = {
  account: string;
  name: string;
  description: string;
  logo: string;
  number: number;
}

type TProps = {
  item: Reward;
  partner: Partner;
  navigation: { navigate: any };
};

export const RewardGridItem = ({ item, partner, navigation }: TProps) => {
  const onCompanyPress = React.useCallback(() => navigation.navigate('PartnerScreen', { partner }), [item]);
  const onPress = React.useCallback(() => navigation.navigate('RewardItemScreen', { reward: item }), [item]);
  return (
    <Observer>
      {() => (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Image source={{ uri: item && item.image }} style={styles.imageContainer} />
          <View>
            <Text style={styles.titleText}>
              {item && item.caption}
            </Text>
          </View>
          <View style={styles.propsContainer}>
            <ProgressBar
              unfilledColor="#E0E0E0"
              width={95}
              height={2}
              borderWidth={0}
              totalAmount={item && item.totalAmount}
              amountLeft={item && item.resultsAmount}
            />
            <RewardPrice value={item && item.value} />
          </View>
          <CompanyLabel
            company={partner && partner.name}
            logo={partner && partner.logo}
            expiration={item && item.expirationDate}
            onPress={onCompanyPress}
          />
        </TouchableOpacity>
      )}
    </Observer>
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
    padding: 20,
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
