import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import {
  CardComponent,
  Header,
  TabViewWrapper,
  TasksList,
  RewardsList
} from '@app/components';
import { computed } from 'mobx';

import { Task } from "@app/shared/types";

interface HomeScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}

enum Tabs {
  TASKS = 'tasks',
  REWARDS = 'rewards'
}

const routes = [
  {
    key: Tabs.TASKS,
    title: 'Tasks'
  },
  {
    key: Tabs.REWARDS,
    title: 'Rewards'
  }
];

@Drizzle
@observer
export class HomeScreen extends React.Component<HomeScreenProps> {
  private _onTaskClick = (task: Task) =>
    this.props.navigation.navigate('TaskItemScreen', { task });

  componentDidMount(): void {
    const { pointX } = this.props;
    // pointX.fetchTasksCount();
    // pointX.fetchAllTasks();
    // pointX.fetchRewardsCount();
    // pointX.fetchAllRewards();
    // pointX.fetchAllPartners();
    // pointX.fetchPartnersCount();
  }

  @computed
  private get getTabScenes() {
    return ({
      [Tabs.TASKS]: this._renderTasks(),
      [Tabs.REWARDS]: this._renderRewards()
    });
  };

  private _renderTasks = (): JSX.Element => {
    const { pointX } = this.props;

    return (
      <TasksList
        theme={this.props.theme}
        onTaskClick={this._onTaskClick}
        tasks={pointX.tasksList}
        count={pointX.tasksCount}
      />
    );
  };

  private _renderRewards = (): JSX.Element => {
    const { pointX } = this.props;

    return (
      <RewardsList
        navigation={this.props.navigation}
        theme={this.props.theme}
        rewards={pointX.rewardsList}
        rewardsCount={pointX.rewardsCount}
        partnersCount={pointX.partnersCount}
        columnsNum={1}
      />
    );
  };

  public render() {
    return (
      <ScrollView style={styles.rootContainer}>
        <Header />
        <CardComponent tokenBalance={this.props.pointX.userBalance}/>
        <View style={styles.tabViewContainer}>
          <TabViewWrapper
            routes={routes}
            scenes={this.getTabScenes}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#ffffff'
  },
  tabViewContainer: {
    marginTop: 20
  },
});
