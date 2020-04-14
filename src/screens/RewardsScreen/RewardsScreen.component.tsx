import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Header, Icon, ListItem } from 'react-native-elements';
import { observer, inject } from 'mobx-react';

import { RewardsStore } from '../../store/';

interface RewardsScreenProps {
  navigation: { navigate: any };
  rewardsStore: RewardsStore;
}

type RendersType = {
  grid: (item: any) => JSX.Element;
  list: (item: any) => JSX.Element;
};

type TReward = {
  title: string;
  value: number;
  company: string;
  expiration: string;
};


const mockReward : TReward[] = [{
  title: 'Apple Watch Series 3',
  value: 170,
  company: 'Apple',
  expiration: 'Nov 21.'
}, {
  title: 'Apple Watch Series 3',
  value: 170,
  company: 'Apple',
  expiration: 'Nov 21.'
},{
  title: 'Apple Watch Series 3',
  value: 170,
  company: 'Apple',
  expiration: 'Nov 21.'
},{
  title: 'Apple Watch Series 3',
  value: 170,
  company: 'Apple',
  expiration: 'Nov 21.'
}];

@observer
@inject('rewardsStore')
export class RewardsScreen extends React.Component<RewardsScreenProps> {
  private renderSort = () : JSX.Element => (
    <TouchableOpacity onPress={this.props.rewardsStore.toggleListView}>
      <Icon name="info" type="material" />
    </TouchableOpacity>
  );

  private _renderRow = ({item}: {item: TReward}) : JSX.Element => {
    const renders: RendersType = {
      'grid': this._renderGridItem,
      'list': this._renderListItem
    };
    return renders[this.props.rewardsStore.listView].call(this, item);
  };

  // todo: typing
  private _renderGridItem = (item: TReward) : JSX.Element => {
    return (
      <ListItem

      />
    );
  };

  private renderCompany = (company: string, expiration: string) : JSX.Element => {
    return (
      <View>
        <View>
          <Text>

          </Text>
          <Text>

          </Text>
        </View>
        <Image

        />
      </View>
    );
  };

  private _renderListItem = (item: TReward) : JSX.Element => {
    return (
      <ListItem
        containerStyle={styles.listItemContainer}
        leftAvatar={{
          rounded: false,
          source: { uri: `https://picsum.photos/100/100?random=${Math.random()}`},
          containerStyle: {
            ...styles.avatarListItem,
          }
        }}
        rightElement={this.renderCompany(item.company, item.expiration)}
        title={item.title}
        subtitle={item.value && item.value.toString()}
        titleStyle={styles.listItemTitle}
        subtitleStyle={styles.listItemPrice}
        pad={24}
      />
    );
  };

  public render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Rewards',
            style: {
              fontSize: 16,
              lineHeight: 19,
              fontWeight: 'normal'
            }
          }}
          rightComponent={this.renderSort()}
          backgroundColor="#F8F8F8"
        />
        <FlatList
          data={mockReward}
          numColumns={this.props.rewardsStore.columnsNum}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={this._loadMore}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
    );
  }

  private _keyExtractor = (_: TReward, index: number) => index.toString();
  private _loadMore = () => {};
  // private _onRefresh = () => {};
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerText: {},
  listItemContainer: {
    width: 343,
    height: 112,
    borderRadius: 16,
    borderWidth: 0.5,
    marginVertical: 16
  },
  listItemTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 10,
    color: '#4F4F4F'
  },
  gridItemTitle: {},
  listItemPrice: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
    marginBottom: 25
  },
  gridItemPrice: {},
  avatarListItem: {
    width: 96,
    height: 96
  },
  avatarGridItem: {},
  companyTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 12
  },
  expirationText: {
    color: '#828282',
    fontSize: 10,
    lineHeight: 12,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  companyLogo: {
    width: 24,
    height: 24
  }
});
