import React from 'react';
import {View, StyleSheet} from "react-native";
import {Header as Header_, Text, Image, Icon } from "react-native-elements";
import { textStyles } from "@app/theme/text";

type TProps = {};

const smallLogo = require('../../assets/img/SmallLogo.png');

const Header = (props: TProps) => {
  const renderTitle = React.useCallback(() => (
    <View style={styles.headerCaptionContainer}>
      <Image
        source={smallLogo}
        style={styles.image_}
      />
      <Text style={textStyles.screenHeader}>
        Point-X
      </Text>
    </View>
  ), []);

  return (
      <Header_
        centerComponent={renderTitle()}
        rightComponent={<Icon name="info-outline" type="material" size={16} containerStyle={styles.iconContainer}/>}
        backgroundColor="#ffffff"
      />
  );
};

const styles = StyleSheet.create({
  image_: {
    width: 20,
    height: 24,
    marginLeft: 6
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 48,
  },
  headerCaptionContainer: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export { Header };
