import React from 'react';
import { ScrollView } from 'react-native';
import { Header, ListItem } from 'react-native-elements';

interface PartnerScreenProps {
  navigation: { navigate: any; }
}

const LIST = Array.from({length: 15}, (_, i) => i)


export class RewardsScreen extends React.Component<PartnerScreenProps> {

  public render() {
    return (
      <ScrollView>
        <Header
          centerComponent={{text: 'Rewards screen', style: {color: '#fff'}}}
          rightComponent={{icon: 'user-circle', type: 'font-awesome', color: '#fff'}}
          containerStyle={{
            backgroundColor: '#00aced',
          }}
        />
          {
            LIST.map((_, i) => {
              return (
                <ListItem
                  key={i}
                  leftAvatar={{source: {uri: 'https://picsum.photos/300/300?random=' + Math.random()}}}
                  title={'Reward info'}
                  subtitle={'the description'}
                  subtitleStyle={{color: 'green'}}
                  topDivider
                />
              );
            })
          }
      </ScrollView>
    );
  }
};
