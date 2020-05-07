import { observer } from 'mobx-react';

import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import { TasksList } from '@app/components';
import {Partner, Task} from "@app/shared/types";

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
      <View>
        <Header
          centerComponent={{ text: 'Tasks', style: { fontSize: 16, lineHeight: 19, color: '#333333' }}}
          backgroundColor="#fff"
        />
        <TasksList
          tasks={pointX.tasksListWithCompleted}
          theme={this.props.theme}
          count={pointX.tasksCount}
          onTaskClick={this._onTaskClick}
          onPartnerClick={this._onPartnerClick}
          navigation={this.props.navigation}
        />
      </View>
    );
  }

  private _onTaskClick = (task : Task) =>
    this.props.navigation.navigate('TaskItemScreen', { task });

  private _onPartnerClick = (partner: Partner) =>
    this.props.navigation.navigate('PartnerScreen', { partner });

}
