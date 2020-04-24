import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Header, Icon, Text, TextProps} from 'react-native-elements';
import {observer} from "mobx-react";
import {Drizzle, DrizzleProps} from "@app/shared/Drizzle";
import {action, computed, observable} from "mobx";
import {Partner, Reward} from "@app/shared/types";
import {RewardGridItem, RewardListItem} from "@app/components";

interface UserRewardsScreenProps extends DrizzleProps {
  navigation: { navigate: any };
}


type ListView = 'grid' | 'list';
type RendersType = {
  grid: (item: Reward, partner: Partner) => JSX.Element;
  list: (item: Reward, partner: Partner) => JSX.Element;
};

// TODO: MAKE AS SEPARATE COMPONENT

const HEADER : TextProps = {
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
export class UserRewardsScreen extends React.PureComponent<UserRewardsScreenProps> {
  @observable
  listView : ListView = 'list';

  @action.bound toggleListView() : void {
    if (this.listView === 'list') {
      this.listView = 'grid';
      console.log('Swtiched', this.listView);
      return ;
    }
    if (this.listView === 'grid') {
      this.listView = 'list';
      console.log('Swtiched', this.listView);
      return ;
    }
  }

  @computed get columnsNum() {
    if (this.listView === 'list') return 1;
    if (this.listView === 'grid') return 2;
    return ;
  }

  private _renderRow = ({ item }: {item: Reward}) : JSX.Element | undefined => {
    const renders: RendersType = {
      'grid': this._renderGridItem,
      'list': this._renderListItem
    };

    return renders[this.listView].call(this, item, {});
  };

  private _renderGridItem = (item: Reward, partner: Partner) : JSX.Element => {
    return (
      <RewardGridItem
        navigation={this.props.navigation}
        partner={partner}
        item={item}
      />
    );
  };

  private _renderListItem = (item: Reward, partner: Partner) : JSX.Element => {
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
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          rightComponent={this.renderSort()}
          centerComponent={HEADER}
          backgroundColor="#F8F8F8"
        />
        <FlatList
          data={pointX.rewardsList}
          extraData={pointX.rewardsList}
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

  private _keyExtractor = (_ : Reward, index: number) : string => index.toString();
  private _loadMore = () : void => {
    const { pointX } = this.props;
    pointX.fetchRewardsCount();
    pointX.fetchAllRewards();
  };
  private renderSort = () : JSX.Element => (
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
