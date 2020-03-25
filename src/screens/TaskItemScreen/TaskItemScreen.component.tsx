import React from 'react';
import { Card, Text } from 'react-native-elements';
import { ITaskDataResponseItem } from '../../store/DataStore';

interface Props {
  item: ITaskDataResponseItem;
  route: { params: { item: ITaskDataResponseItem; } }
}

export class TaskItemScreen extends React.Component<Props> {
  public render() {
    const {route} = this.props;
    const item = route.params.item;
    return (
      <Card title={item.caption} image={{uri: 'https://picsum.photos/200/200?random=1' + Math.random()}}>
        <Text>{item.description}</Text>
      </Card>
    );
  }
};
