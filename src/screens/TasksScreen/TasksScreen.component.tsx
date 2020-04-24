import { observer, Observer } from 'mobx-react';

import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import { TaskListItem } from '@app/components';
import {Task} from "@app/shared/types";

interface dataStoreProps extends DrizzleProps {
  navigation: { navigate: any };
}

@observer
@Drizzle
export class TasksScreen extends React.Component<dataStoreProps> {

  componentDidMount() {
    const { pointX } = this.props;
    pointX.fetchTasksCount();
    pointX.fetchAllTasks();
  }

  public render() {
    const { pointX } = this.props;
    return (
      <FlatList
        data={pointX.tasksList}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={this._loadMore}
      />
    );
  }

  private _keyExtractor = (_: any, index: any) => `${index}`;

  private _loadMore = () => {
    const { pointX } = this.props;
    pointX.fetchTasksCount();
    pointX.fetchAllTasks();
  };

  private _onTaskClick = (task : Task) =>
    this.props.navigation.navigate('TaskItemScreen', { task });

  private _renderRow = (data: { item: any; }) => {
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
    else {
      return undefined;
    }
  };
}


const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
  },
  containerRowMiddle: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10
  },
  containerRowRight: {
    alignItems: 'flex-end'
  },
  bottomDeriver: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  }
});
