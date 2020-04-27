import React from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, IconProps, Icon} from 'react-native-elements';


type TProps = {
  title: string;
  onPress?: () => void;
  subtitle?: string;
  withChevron?: boolean;
  rightIcon?: IconProps;
};


export const SettingsMenuItem = React.memo(observer((props: TProps) : JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress || function () {}}>
      <View style={styles.containerRow}>
        <View style={styles.containerRowLeft}>
          <Text style={[props.subtitle ? styles.title : styles.singleTitle]}>{props.title}</Text>
          {props && props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
        </View>
        <View style={styles.containerRowRight}>
          {props.rightIcon && props.rightIcon.type && <Icon containerStyle={styles.rightIcon} {...props.rightIcon}/>}
          {props.withChevron && <Icon type="material" name="chevron-right" />}
        </View>
      </View>
      <View style={styles.bottomDivider} />
    </TouchableOpacity>
  );
}));


const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9
  },
  containerRowLeft: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10
  },
  containerRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightIcon: {
    marginRight: 30
  },
  singleTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#4F4F4F',
    fontSize: 16,
    lineHeight: 19,
    height: 22,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#4F4F4F',
    fontSize: 14,
    lineHeight: 16,
    height: 22,
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 12,
    lineHeight: 14,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  bottomDivider: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginRight: 60,
    marginBottom: 0
  }
});
