import { inject, observer } from 'mobx-react';

import React from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card, Image, Text } from 'react-native-elements';
import DataStore, { ITaskDataResponseItem } from '../../store/DataStore';

interface dataStoreProps {
  dataStore: DataStore;
  navigation: { navigate: any; }
}

@inject('dataStore')
@observer
export class ScreenTaskList extends React.Component<dataStoreProps> {
  public render() {
    const {dataStore} = this.props;
    return (
      <FlatList
        data={dataStore.taskList}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
      />
    );
  }

  private _keyExtractor = (item: ITaskDataResponseItem) => `${item.value}`;

  private _renderRow = ({item}: { item: ITaskDataResponseItem }) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('TaskItem', {item})}>
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
      </TouchableOpacity>
    )
  }
};
