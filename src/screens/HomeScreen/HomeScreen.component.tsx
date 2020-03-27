import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView } from 'react-native';
import {
  Header, PricingCard, ListItem, Card,
} from 'react-native-elements';

interface HomeScreenProps {
  navigation: { navigate: any };
}

const LIST = Array.from({ length: 5 }, (_, i) => i);

@observer
export class HomeScreen extends React.Component<HomeScreenProps> {
  public render() {
    return (
      <ScrollView>
        <Header
          centerComponent={{ text: 'Home screen', style: { color: '#fff' } }}
          rightComponent={{ icon: 'user-circle', type: 'font-awesome', color: '#fff' }}
          containerStyle={{
            backgroundColor: '#00aced',
          }}
        />
        <PricingCard
          color="#c0c0c0"
          title="Account details"
          price="$1000"
          info={['Address: X01212']}
          button={{ title: 'Check it out', icon: '' }}
        />
        <Card
          title="Tasks"
        >
          {
            LIST.map((_, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: `https://picsum.photos/100/100?random=${Math.random()}` } }}
                title="Task info"
                subtitle="Description"
                subtitleStyle={{ color: 'green' }}
                topDivider
                onPress={() => navigation.navigate('TasksScreen')}
              />
            ))
          }
        </Card>
        <Card
          title="Rewards"
        >
          {
            LIST.map((_, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: `https://picsum.photos/100/100?random=${Math.random()}` } }}
                title="Reward info"
                subtitle="Description"
                subtitleStyle={{ color: 'green' }}
                topDivider
                onPress={() => navigation.navigate('RewardsScreen')}
              />
            ))
          }
        </Card>
      </ScrollView>
    );
  }
}
