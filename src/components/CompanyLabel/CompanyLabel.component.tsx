import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

type TProps = {
  company: string;
  logo?: string;
  expiration?: string;
};

export const CompanyLabel = ({ company, expiration, logo }: TProps) => {
  return (
    <View style={styles.companyContainer}>
      <View style={styles.companyTextContainer}>
        <Text style={styles.companyTitle}>
          {company}
        </Text>
        <Text style={styles.expirationText}>
          {expiration}
        </Text>
      </View>
      <Avatar
        source={{ uri: `https://picsum.photos/100/100?random=${Math.random()}` || logo }}
        containerStyle={styles.companyLogo}
        rounded
      />
    </View>
  );
};

const styles = StyleSheet.create({
  companyTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right'
  },
  companyTextContainer: {
    right: 5
  },
  expirationText: {
    color: '#828282',
    fontSize: 10,
    lineHeight: 12,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  companyLogo: {
    width: 20,
    height: 20
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
