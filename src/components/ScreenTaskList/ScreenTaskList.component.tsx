import { inject, observer } from 'mobx-react';

import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Button, Card, Image, Text } from 'react-native-elements';
import DataStore, { ITaskDataResponseItem } from '../../store/DataStore';

interface dataStoreProps {
  dataStore: DataStore;
}

@inject('dataStore')
@observer
export class ScreenTaskList extends React.Component<dataStoreProps> {
  public render() {
    const ds = this.props.dataStore;
    return (
      <FlatList
        data={ds.taskList}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  private _keyExtractor = (item: ITaskDataResponseItem) => `${item.value}`;

  private _renderRow = ({item}: { item: ITaskDataResponseItem }) => {
    return (
      <Card>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={{uri: item.image}}
            style={{width: 100, height: 100, margin: 5}}
            PlaceholderContent={<ActivityIndicator/>}
          />
          <View>
            <Text h4>Caption: {item.caption}</Text>
            <Text>Value: {item.value}</Text>
          </View>
        </View>
        <Text>{item.description}</Text>
        <Button
          title="Mark task as done"
          type="clear"
        />
      </Card>
    )
  }
};
