import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView } from 'react-native';
import {
  Header, PricingCard, ListItem, Card,
} from 'react-native-elements';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';

interface HomeScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}

const LIST = Array.from({ length: 5 }, (_, i) => i);

@Drizzle
@observer
export class HomeScreen extends React.Component<HomeScreenProps> {
  private tasksCount: any;

  componentDidMount(): void {
    const { props } = this;
    const { contractsCall } = props;
    this.tasksCount = contractsCall.getTasksCount.cacheCall();
  }


  public render() {
    const { props } = this;
    const { navigation, contractsGet } = props;
    let tasksCount = [];
    if (this.tasksCount) {
      tasksCount = contractsGet.getTasksCount[this.tasksCount];
    }

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
          title="Contracts count:"
          price={tasksCount.value}
          info={['Some details']}
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
