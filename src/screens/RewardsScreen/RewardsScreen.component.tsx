import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, TextProps } from 'react-native-elements';
import { action, computed, observable } from 'mobx';
import { Observer, observer } from 'mobx-react';

import { RewardListItem, RewardGridItem } from '@app/components/';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import { Reward, Partner } from "@app/shared/types";

interface RewardsScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}

type ListView = 'grid' | 'list';
type RendersType = {
  grid: (item: Reward, partner: Partner) => JSX.Element;
  list: (item: Reward, partner: Partner) => JSX.Element;
};

const HEADER: TextProps = {
  // @ts-ignore
  text: 'Rewards',
  style: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal'
  }
};

@observer
@Drizzle
export class RewardsScreen extends React.Component<RewardsScreenProps> {
  @observable listView: ListView = 'list';

  componentDidMount() {
    const { pointX } = this.props;
    pointX.fetchRewardsCount();
    pointX.fetchPartnersCount();
    pointX.fetchAllRewards();
    pointX.fetchAllPartners();
  }

  @action.bound toggleListView(): void {
    if (this.listView === 'list') {
      this.listView = 'grid';
      return;
    }
    if (this.listView === 'grid') {
      this.listView = 'list';
      return;
    }
  }

  @computed get columnsNum() {
    if (this.listView === 'list') return 1;
    if (this.listView === 'grid') return 2;
    return;
  }

  @observable
  private _renderRow = ({ item }: { item: Reward }): JSX.Element | undefined => {
    const renders: RendersType = {
      'grid': this._renderGridItem,
      'list': this._renderListItem
    };

    let partner = {};
    return (
      <Observer>
        {() => renders[this.listView].call(this, item, partner)}
      </Observer>
    );
  };

  private _renderGridItem = (item: Reward, partner: Partner): JSX.Element => {
    return (
      <RewardGridItem
        navigation={this.props.navigation}
        partner={partner}
        item={item}
      />
    );
  };

  private _renderListItem = (item: Reward, partner: Partner): JSX.Element => {
    return (
      <RewardListItem
        navigation={this.props.navigation}
        partner={partner}
        item={item}
      />
    );
  };

  public render() {
    const { pointX } = this.props;

    return (
      <View style={styles.container}>
        <Header
          rightComponent={this.renderSort()}
          centerComponent={HEADER}
          backgroundColor="#F8F8F8"
        />
        <FlatList
          data={pointX.rewardsList}
          key={this.columnsNum}
          numColumns={this.columnsNum}
          renderItem={this._renderRow}
          onEndReached={this._loadMore}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={0.4}
        />
      </View>
    );
  }

  private _keyExtractor = (_: Reward, index: number): string => index.toString();
  private _loadMore = (): void => {
    const { pointX } = this.props;
    pointX.fetchRewardsCount();
    pointX.fetchAllRewards();
  };
  private renderSort = (): JSX.Element => (
    <TouchableOpacity onPress={this.toggleListView}>
      <Icon name="list" type="material" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8'
  }
});
