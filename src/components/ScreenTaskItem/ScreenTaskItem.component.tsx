import React from 'react';
import { Card, Text } from 'react-native-elements';
import { ITaskDataResponseItem } from '../../store/DataStore';

interface Props {
  item: ITaskDataResponseItem;
  route: { params: { item: ITaskDataResponseItem; } }
}

export class ScreenTaskItem extends React.Component<Props> {
  public render() {
    const {route} = this.props;
    const item = route.params.item;
    return (
      <Card title={item.caption} image={{uri: item.image}}>
        <Text>Value: {item.value}</Text>
        <Text>Decription: {item.description}</Text>
      </Card>
    );
  }
};
