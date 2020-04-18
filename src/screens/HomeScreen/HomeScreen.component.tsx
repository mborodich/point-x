import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { DrizzleProps } from '@app/shared/Drizzle';
import { CardComponent, Header } from '@app/components';


interface HomeScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}

const LIST = Array.from({ length: 10 }, (_, i) => i);


const MOCKS = [
  {
    name: 'Amazon',
    description: 'Got reward',
    image: 'https://mms.businesswire.com/media/20190228005194/en/3799/23/logo_white_.jpg',
    value: -21,
    date: 'Nov 6.'
  },
  {
    name: 'Google',
    description: 'Completed task',
    image: 'https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg',
    value: +100,
    date: 'Nov 3.'
  },
  {
    name: 'Apple',
    description: 'Completed task',
    image: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    value: +50,
    date: 'Sep 2.'
  },
];


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
        <Text style={styles.historyTitle}>History</Text>
          {
            MOCKS.map((item, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: item.image } }}
                title={item.name}
                subtitle={item.description}
                rightTitle={item.value > 0 ? `+${item.value}` : item.value.toString()}
                rightSubtitle={item.date}
                titleStyle={styles.historyItemTitle}
                rightTitleStyle={{ ...styles.historyItemTitle, color: item.value > 0 ? '#219653' : '#828282'}}
                rightSubtitleStyle={styles.historyItemDesc}
                subtitleStyle={styles.historyItemDesc}
                bottomDivider
                onPress={() => navigation.navigate('PartnerScreen')}
              />
            ))
          }
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
