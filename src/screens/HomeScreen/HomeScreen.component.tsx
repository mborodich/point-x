import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  PricingCard, ListItem, Card, Text
} from 'react-native-elements';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';
import { CardComponent, Header } from '../../components';


interface HomeScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}

const LIST = Array.from({ length: 10 }, (_, i) => i);

// @Drizzle
@observer
export class HomeScreen extends React.Component<HomeScreenProps> {

  public render() {
    const { props } = this;

    const { navigation } = props;

    return (
      <ScrollView style={styles.rootContainer}>
        <Header />
        <CardComponent />
        {/*<PricingCard*/}
        {/*  color="#c0c0c0"*/}
        {/*  title="Contracts count:"*/}
        {/*  price={0}*/}
        {/*  info={['Some details']}*/}
        {/*  button={{ title: 'Check it out', icon: '' }}*/}
        {/*/>*/}
        <Text style={styles.historyTitle}>History</Text>
        {/*<Card*/}
        {/*  title="History"*/}
        {/*  titleStyle={styles.historyTitle}*/}
        {/*  containerStyle={{ padding: 0 }}*/}
        {/*  dividerStyle={{ backgroundColor: '#fff' }}*/}
        {/*>*/}
          {
            LIST.map((_, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: `https://picsum.photos/100/100?random=${Math.random()}` } }}
                title="Company Name"
                subtitle="History description"
                rightTitle="-21"
                rightSubtitle="Nov. 21"
                titleStyle={styles.historyItemTitle}
                rightTitleStyle={styles.historyItemTitle}
                rightSubtitleStyle={styles.historyItemDesc}
                subtitleStyle={styles.historyItemDesc}
                bottomDivider
                onPress={() => navigation.navigate('TasksScreen')}
              />
            ))
          }
        {/*</Card>*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#ffffff'
  },
  historyItemTitle: {
    fontSize: 14,
    lineHeight: 17,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  historyItemDesc: {
    fontSize: 12,
    lineHeight: 14,
    marginTop: 5,
    color: '#828282',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  historyTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: '#4F4F4F',
    textAlign: 'left',
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingLeft: 16,
    paddingTop: 24
  }
});
