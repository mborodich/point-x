import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Text, IconProps, ListItem} from 'react-native-elements';


type TProps = {
  onPress: () => any;
  title: string;
  containerStyle?: object;
  subtitle?: string;
  withChevron?: boolean;
  withDivider?: boolean;
  icon?: string;
  dividerStyle?: object;
  iconProps?: IconProps;
};


export const SettingsMenuItem = (props: TProps) : JSX.Element => {

  const _renderTitleWithDivider = React.useCallback(() : JSX.Element => (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
      {props.withDivider && <Divider style={styles.rootDivider} />}
    </View>
  ), [props.title, props.withDivider]);

  const _renderContent = React.useCallback(() : JSX.Element => (
    <ListItem
      title={_renderTitleWithDivider()}
      containerStyle={styles.rootContainer}
      contentContainerStyle={{  }}
      chevron={props.withChevron}
    />
  ), [props.subtitle, props.title]);


  return (
    <TouchableOpacity style={{ ...styles.rootContainer, ...props.containerStyle }}>
      {_renderContent()}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  rootContainer: {
    height: 48,
    width: 400
  },

  rootDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 7,
    width: 340
  },
  textContainer: {
    width: 350
  }
});
