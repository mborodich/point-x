import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView, StyleSheet, FlatList, View } from 'react-native';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import {
  CardComponent,
  Header,
  TabViewWrapper,
  TaskListItem,
  RewardListItem
} from '@app/components';

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

@observer
@Drizzle
export class HomeScreen extends React.PureComponent<HomeScreenProps> {
  private _onTaskClick = (task : Task) =>
    this.props.navigation.navigate('TaskItemScreen', { task });

  private getTabScenes = () => {
    return ({
      [Tabs.TASKS]: this._renderTasks(),
      [Tabs.REWARDS]: this._renderRewards()
    });
  };

  private _keyExtractor = (_: any, index: any) => `${index}`;

  private _renderTaskRow = (data: { item: any; }) : JSX.Element | undefined => {
    if (data && data.item) {
      let task = data.item;
      const [
        caption,
        description,
        image,
        value,
        owner,
      ] = task;
      task = { caption, description, image, value, owner };
      return (
        <TaskListItem
          task={task}
          theme={this.props.theme}
          onClick={() => this._onTaskClick(task)}
        />
      )
    }
    return undefined;
  };

  private _renderRewardRow = (data: { item: any; }) : JSX.Element | undefined => {
    if (data && data.item) {
      const reward = data.item;
      const { pointX } = this.props;
      return (
        <RewardListItem
          item={reward}
          partner={{}}
          navigation={this.props.navigation}
        />
      )
    }
    return undefined;
  };

  private _fetchMoreTasks = () : void => {
    const { pointX } = this.props;
    pointX.fetchTasksCount();
    pointX.fetchAllTasks();
  };


  private _fetchMoreRewards = () : void => {
    const { pointX } = this.props;
    pointX.fetchRewardsCount();
    pointX.fetchAllRewards();
  };

  private _renderTasks = () : JSX.Element => {
    const { pointX } = this.props;
    return (
      <FlatList
        data={pointX.tasksList}
        renderItem={this._renderTaskRow}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={this._fetchMoreTasks}
      />
    )
  };

  private _renderRewards = () : JSX.Element => {
    const { pointX } = this.props;
    return (
      <FlatList
        data={pointX.rewardsList}
        renderItem={this._renderRewardRow}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={this._fetchMoreRewards}
      />
    );
  };

  componentDidMount(): void {
    const { pointX } = this.props;
    pointX.fetchTasksCount();
    pointX.fetchAllTasks();
    pointX.fetchRewardsCount();
    pointX.fetchAllRewards();
  }

  public render() {
    return (
      <ScrollView style={styles.rootContainer}>
        <Header />
        <CardComponent />
        <View style={styles.tabViewContainer}>
          <TabViewWrapper
            routes={routes}
            scenes={this.getTabScenes()}
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
