import React from 'react';
import { ScrollView } from 'react-native';
import { Tile, ListItem, Card } from 'react-native-elements';

interface PartnerScreenProps {
  navigation: { navigate: any; }
}

const LIST = Array.from({length: 5}, (_, i) => i)

export class PartnerScreen extends React.Component<PartnerScreenProps> {

  public render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <Tile
          imageSrc={{uri: 'https://picsum.photos/300/300?random=' + Math.random()}}
          title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
          featured
          caption="Some Caption Text"
        />
        <Card
          title='Tasks'>
          {
            LIST.map((_, i) => {
              return (
                <ListItem
                  key={i}
                  leftAvatar={{source: {uri: 'https://picsum.photos/100/100?random=' + Math.random()}}}
                  title={'Task info'}
                  subtitle={'Description'}
                  subtitleStyle={{color: 'green'}}
                  topDivider
                  onPress={() => navigation.navigate('TasksScreen')}
                />
              );
            })
          }
        </Card>
        <Card
          title='Rewards'>
          {
            LIST.map((_, i) => {
              return (
                <ListItem
                  key={i}
                  leftAvatar={{source: {uri: 'https://picsum.photos/100/100?random=' + Math.random()}}}
                  title={'Reward info'}
                  subtitle={'Description'}
                  subtitleStyle={{color: 'green'}}
                  topDivider
                  onPress={() => navigation.navigate('RewardsScreen')}
                />
              );
            })
          }
        </Card>
      </ScrollView>
    );
  }
};
