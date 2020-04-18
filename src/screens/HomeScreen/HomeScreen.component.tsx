import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { DrizzleProps } from '@app/shared/Drizzle';
import { CardComponent, Header } from '@app/components';
import { FULL_MOCKS , getMocksByName } from "@app/utils";


interface HomeScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}

const LIST = Array.from({ length: 10 }, (_, i) => i);


// @Drizzle
@observer
export class HomeScreen extends React.Component<HomeScreenProps> {

  public render() {
    const { props } = this;

    let MOCKS = [];
    for (const {history} of FULL_MOCKS) {
      for (const i of history) {
        MOCKS.push(i);
      }
    }


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
                subtitle={item.description.length > 40 ? item.description.slice(0, 35) + '...': item.description}
                rightTitle={item.value > 0 ? `+${item.value}` : item.value.toString()}
                rightSubtitle={item.date}
                titleStyle={styles.historyItemTitle}
                rightTitleStyle={{ ...styles.historyItemTitle, color: item.value > 0 ? '#219653' : '#828282'}}
                rightSubtitleStyle={styles.historyItemDesc}
                subtitleStyle={styles.historyItemDesc}
                bottomDivider
                onPress={() => navigation.navigate('PartnerScreen', { partner: getMocksByName(item.company) })}
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
    // lineHeight: 14,
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
