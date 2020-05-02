import React from 'react';
import { FlatList } from "react-native";
import {TaskListItem} from "@app/components";


type TProps = {
  tasks: any[];
  theme: any;
  count: number;
  onTaskClick: (task: any) => void;
};


export const TasksList = React.memo((props: TProps) => {
  const tasks = React.useMemo(() => {
    return props.tasks;
  }, [props.count, props.tasks && props.tasks.length]);

  const _keyExtractor = React.useCallback((_: any, index: any) => `${index}`, [props.count]);

  const _renderRow = React.useCallback((data: {item: any;}) => {
    if (data && data.item) {
      let task = data.item;
      const [
        caption,
        description,
        image,
        value,
        owner,
      ] = task;
      return (
        <TaskListItem
          task={{ caption, description, image, value, owner }}
          theme={props.theme}
          onClick={() => props.onTaskClick(task)}
        />
      )
    }
    return undefined;
  }, [props.count]);

  return (
    <FlatList
      data={tasks}
      extraData={tasks}
      keyExtractor={_keyExtractor}
      renderItem={_renderRow}
    />
  )
});
