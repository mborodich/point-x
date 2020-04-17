import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, ListItem, TextProps } from 'react-native-elements';
import { observer, inject } from 'mobx-react';

import { RewardListItem, RewardGridItem } from '../../components';
import { RewardsStore } from '../../store/';

interface RewardsScreenProps {
  navigation: { navigate: any };
  rewardsStore: RewardsStore;
}

type RendersType = {
  grid: (item: any) => JSX.Element;
  list: (item: any) => JSX.Element;
};

export type TReward = {
  title: string;
  value: number;
  company: string;
  expiration: string;
  amountLeft: number;
  totalAmount: number;
  image: string;
};

const HEADER : TextProps = {
  // @ts-ignore
  text: 'Rewards',
  style: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal'
  }
};

const mockFactory = () : TReward => ({
  title: 'Apple Watch Series 3',
  value: 170,
  company: 'Apple',
  expiration: '175 days left',
  amountLeft: 50,
  totalAmount: 175,
  image: `https://picsum.photos/100/100?random=${Math.random()}`
});

const mockReward : TReward[] =
  Array.from({ length: 15 }).map(() => mockFactory());

@inject('rewardsStore')
@observer
export class RewardsScreen extends React.PureComponent<RewardsScreenProps> {
  private _renderRow = ({ item }: {item: TReward}) : JSX.Element => {
    const renders: RendersType = {
      'grid': this._renderGridItem,
      'list': this._renderListItem
    };
    return renders[this.props.rewardsStore.listView].call(this, item);
  };

  private _renderGridItem = (item: TReward) : JSX.Element => {
    return (
      <RewardGridItem onPress={this.navigateToDetail} item={item} />
    );
  };

  private _renderListItem = (item: TReward) : JSX.Element => {
    return (
      <RewardListItem onPress={this.navigateToDetail} item={item} />
    );
  };

  private navigateToDetail = () : Promise<void> =>
    this.props.navigation.navigate('RewardItemScreen');

  public render() {
    return (
      <View style={styles.container}>
        <Header
          rightComponent={this.renderSort()}
          centerComponent={HEADER}
          backgroundColor="#F8F8F8"
        />
        <FlatList
          data={mockReward}
          contentContainerStyle={styles.listContainer}
          key={this.props.rewardsStore.columnsNum}
          numColumns={this.props.rewardsStore.columnsNum}
          renderItem={this._renderRow}
          onEndReached={this._loadMore}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={0.4}
        />
      </View>
    );
  }

  private _keyExtractor = (_: TReward, index: number) => index.toString();
  private _loadMore = () => {};
  private renderSort = () : JSX.Element => (
    <TouchableOpacity onPress={this.props.rewardsStore.toggleListView}>
      <Icon name="info" type="material" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  listContainer: {
    alignItems: 'center',
    marginTop: 8.5
  }
});
