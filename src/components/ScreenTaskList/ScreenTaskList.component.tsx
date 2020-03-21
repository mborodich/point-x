import { observable, ObservableMap } from 'mobx';
import { inject, observer } from 'mobx-react';

import React from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card, Image, Text } from 'react-native-elements';
import DataStore, { ITaskDataResponseItem } from '../../store/DataStore';

interface dataStoreProps {
  dataStore: DataStore;
  navigation: { navigate: any; }
}
console.disableYellowBox = true;

@inject('dataStore')
@observer
export class ScreenTaskList extends React.Component<dataStoreProps> {
  @observable private _doneTasks: ObservableMap<number, boolean>;

  constructor() {
    super();
    this._doneTasks = observable.map({});
  }

  public render() {
    const {dataStore} = this.props;
    return (
      <FlatList
        data={dataStore.taskList}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={this._loadMore}
        onRefresh={this._onRefresh}
        refreshing={dataStore.isLoading}
      />
    );
  }

  private _keyExtractor = (item: ITaskDataResponseItem) => `${item.value}`;

  private _loadMore = () => {
    this.props.dataStore.loadMore()
  }

  private _onRefresh = () => {
    this.props.dataStore.refresh()
  }

  private _renderRow = ({item}: { item: ITaskDataResponseItem }) => {
    const {navigation} = this.props;
    const Item = observer(() => {
      const isDone = this._doneTasks.get(item.value);

      return (
        <TouchableOpacity onPress={() => navigation.navigate('TaskItem', {item})}>
          <Card wrapperStyle={{opacity: isDone ? 0.2 : 1}}>
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
            {this._doneTasks}
            <Button
              title="Mark task as done"
              type="clear"
              onPress={() => {
                this._doneTasks.set(item.value, !isDone)
              }}
            />
          </Card>
        </TouchableOpacity>
      )
    });

    return <Item/>;
  }
};
