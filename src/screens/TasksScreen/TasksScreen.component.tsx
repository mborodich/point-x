import { inject, observer } from 'mobx-react';

import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, Button, Card, ListItem, Text } from 'react-native-elements';
import DataStore, { ITaskDataResponseItem } from '../../store/DataStore';

interface dataStoreProps {
  dataStore: DataStore;
  navigation: { navigate: any; }
}


@inject('dataStore')
@observer
export class TasksScreen extends React.Component<dataStoreProps> {

  constructor(props: dataStoreProps) {
    super(props);
  }

  public render() {
    const {dataStore} = this.props;
    return (
      <View>
        <FlatList
          data={dataStore.taskList}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={this._loadMore}
          onRefresh={this._onRefresh}
          refreshing={dataStore.isLoading}
        />
      </View>
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
      return (
        <Card>
          <TouchableOpacity onPress={() => navigation.navigate('TaskItemScreen', {item})}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View>
                <Avatar
                  rounded
                  source={{uri: 'https://picsum.photos/100/100?random=1' + Math.random()}}
                  size="large"
                />
                <Badge
                  status="success"
                  value={item.value + '/100'}
                  containerStyle={{position: 'absolute', top: -4, right: -15}}
                />
              </View>
              <View style={{marginLeft: 20}}>
                <Text h4>{item.caption}</Text>
                <Text>{item.value} TOKENS (2 days left)</Text>
              </View>
              <Button
                title="Try it"
                buttonStyle={[{position: 'absolute', top: -4, right: -100, padding: 3, width: 60}]}
              />
            </View>
            <Text style={{paddingVertical: 20}}>{item.description.substr(0, 150)}</Text>
          </TouchableOpacity>
          <ListItem
            leftAvatar={{source: {uri: 'https://picsum.photos/100/100?random=1' + Math.random()}}}
            title={'Author'}
            subtitle={'subtitle'}
            chevron
            topDivider
            onPress={() => navigation.navigate('PartnerScreen', {item})}
          />
        </Card>
      )
    });

    return <Item/>;
  }
};
