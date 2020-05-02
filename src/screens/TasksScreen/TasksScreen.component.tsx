import { observer } from 'mobx-react';

import React from 'react';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import { TasksList } from '@app/components';
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
      <TasksList
        tasks={pointX.tasksList}
        theme={this.props.theme}
        count={pointX.rewardsList}
        onTaskClick={this._onTaskClick}
      />
    );
  }

  private _onTaskClick = (task : Task) =>
    this.props.navigation.navigate('TaskItemScreen', { task });

}
