import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {timeToX} from '@app/utils';

type TProps = {
  company: string;
  logo?: string;
  expiration?: number;
  onPress?: () => any;
};


export const CompanyLabel = ({ company, expiration, onPress, logo }: TProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.companyContainer}>
      <View style={styles.companyTextContainer}>
        <Text style={styles.companyTitle}>
          {company}
        </Text>
        <Text style={styles.expirationText}>
          {expiration && timeToX(expiration)}
        </Text>
      </View>
      <Avatar
        source={{ uri: logo }}
        containerStyle={styles.companyLogo}
        rounded
      />
    </TouchableOpacity>
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
