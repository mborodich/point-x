import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, TextProps } from 'react-native-elements';
import { action, computed, observable } from 'mobx';
import { Observer, observer } from 'mobx-react';

import { RewardListItem, RewardGridItem, RewardsList } from '@app/components/';
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
    return 1;
  }

  public render() {
    const { pointX } = this.props;

    return (
      <View style={styles.container}>
        <Header
          rightComponent={this.renderSort()}
          centerComponent={HEADER}
          backgroundColor="#F8F8F8"
        />
        <RewardsList
          navigation={this.props.navigation}
          rewards={pointX.rewardsList}
          columnsNum={this.columnsNum}
          rewardsCount={pointX.rewardsCount}
          partnersCount={pointX.partnersCount}
          theme={this.props.theme}
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
