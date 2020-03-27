import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import {
  Avatar, Badge, Button, Card, Header, ListItem, Text,
} from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import DataStore, { ITaskDataResponseItem } from '../../store/DataStore';

interface RewardsScreenProps {
  dataStore: DataStore;
  navigation: { navigate: any };
}

@inject('dataStore')
@observer
export class RewardsScreen extends React.Component<RewardsScreenProps> {
  public render() {
    const { dataStore } = this.props;

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
    this.props.dataStore.loadMore();
  };

  private _onRefresh = () => {
    this.props.dataStore.refresh();
  };

  private _renderRow = ({ item }: { item: ITaskDataResponseItem }) => {
    const { navigation } = this.props;
    const Item = observer(() => (
      <Card>
        <TouchableOpacity onPress={() => navigation.navigate('RewardItemScreen')}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              <Avatar
                rounded
                source={{ uri: `https://picsum.photos/100/100?random=1${Math.random()}` }}
                size="large"
              />
              <Badge
                status="success"
                value={`${item.value}/100`}
                containerStyle={{ position: 'absolute', top: -4, right: -15 }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text h4>Reward Info</Text>
              <Text>
                {item.value}
                {' '}
                TOKENS (2 days left)
              </Text>
            </View>
            <Button
              title="Try it"
              buttonStyle={[{
                position: 'absolute', top: -4, right: -100, padding: 3, width: 60,
              }]}
            />
          </View>
          <Text style={{ paddingVertical: 20 }}>Reward description</Text>
        </TouchableOpacity>
        <ListItem
          leftAvatar={{ source: { uri: `https://picsum.photos/100/100?random=1${Math.random()}` } }}
          title="Author"
          subtitle="subtitle"
          chevron
          topDivider
          onPress={() => navigation.navigate('PartnerScreen', { item })}
        />
      </Card>
    ));

    return <Item />;
  };
}
