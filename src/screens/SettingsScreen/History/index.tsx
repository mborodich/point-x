import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Header, TextProps} from 'react-native-elements';
import { observer } from 'mobx-react';
import { Drizzle, DrizzleProps } from "@app/shared/Drizzle";
import { HistoryItem } from '@app/components';


interface HistoryScreenProps extends DrizzleProps {
  navigation: { navigate: any; goBack: any; };
}

const MOCKS = [
  {
    name:  'Cappucino',
    image: `https://sbermarket.ru/spree/products/166381/preview/174545.jpg?1566502806`,
    description: 'Outside of Italy, cappuccino is a coffee drink that today is typically composed of a single espresso shot and hot milk, with the surface topped with foamed milk.',
    value: -100,
    date: '21 Nov.',
  },
  {
    name:  'Cappucino',
    image: `https://sbermarket.ru/spree/products/166381/preview/174545.jpg?1566502806`,
    description: 'Outside of Italy, cappuccino is a coffee drink that today is typically composed of a single espresso shot and hot milk, with the surface topped with foamed milk.',
    value: 100,
    date: '21 Nov.',
  },
  {
    name:  'Frapuccino',
    image: `https://sbermarket.ru/spree/products/166381/preview/174545.jpg?1566502806`,
    description: 'Outside of Italy, cappuccino is a coffee drink that today is typically composed of a single espresso shot and hot milk, with the surface topped with foamed milk.',
    value: 1000,
    date: '21 Nov.',
  },
];

const HEADER : TextProps = {
  // @ts-ignore
  text: 'History',
  style: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal'
  }
};

@observer
@Drizzle
export class HistoryScreen extends React.PureComponent<HistoryScreenProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          centerComponent={HEADER}
          backgroundColor="#F8F8F8"
        />
        {
          MOCKS.map((item, idx) => (
            <HistoryItem item={item} key={idx} onClick={() => {}} />
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  }
});
