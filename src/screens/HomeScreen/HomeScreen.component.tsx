import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Header, PricingCard, ListItem, Card, Text } from 'react-native-elements';

interface HomeScreenProps {
  navigation: { navigate: any; }
}

const HISTORY_LIST = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '+100$'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '+20$'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '+10$'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '+120$'
  },
]


@observer
export class HomeScreen extends React.Component<HomeScreenProps> {

  public render() {
    return (
      <View>
        <Header
          centerComponent={{text: 'Home screen', style: {color: '#fff'}}}
          rightComponent={{icon: 'user-circle', type: 'font-awesome', color: '#fff'}}
          containerStyle={{
            backgroundColor: '#00aced',
          }}
        />
        <PricingCard
          color="#c0c0c0"
          title="Account details"
          price="$1000"
          info={['Address: X01212']}
          button={{title: 'Check it out', icon: ''}}
        />
        <Card
          title='HISTORY'>
          <Text style={{marginBottom: 10}}>
            Your history right here:
          </Text>
          {
            HISTORY_LIST.map((l, i) => {
              return (
                <ListItem
                  key={i}
                  leftAvatar={{source: {uri: l.avatar_url}}}
                  title={l.name}
                  subtitle={l.subtitle}
                  subtitleStyle={{color: 'green'}}
                  topDivider
                />
              );
            })
          }
        </Card>
      </View>
    );
  }
};
