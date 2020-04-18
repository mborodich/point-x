import React from 'react';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import {Avatar, Header, Text} from 'react-native-elements';
import {TabView, TabBar} from 'react-native-tab-view';
import {RewardListItem} from '@app/components';


interface PartnerScreenProps {
  navigation: { navigate: any; goBack: any; };
}

enum Tabs {
  ACTIVE = 'active',
  ARCHIVE = 'archive'
}

const routes = [
  {
    key: Tabs.ACTIVE,
    title: 'Active'
  },
  {
    key: Tabs.ARCHIVE,
    title: 'Archive'
  }
];

const MOCKS = [
  {
    title: `Apple Watch Series 3`,
    value: 170,
    company: 'Apple',
    expiration: '175 days left',
    amountLeft: 50,
    totalAmount: 175,
    image: `https://www.apple.com/newsroom/images/product/watch/standard/watch_series_3_incoming_two-wrap_big.gif.large.gif`
  },
  {
    title: 'Iphone X',
    value: 1000,
    company: 'Apple',
    expiration: '100 days left',
    amountLeft: 70,
    totalAmount: 300,
    image: `https://items.s1.citilink.ru/1361005_v01_b.jpg`
  }
];

@observer
export class PartnerScreen extends React.PureComponent<PartnerScreenProps> {
  @observable currentIdx : number = 0;
  @action.bound switchTab() : void {
    if (this.currentIdx === 0) {
      this.currentIdx = 1;
      return ;
    }
    if (this.currentIdx === 1) {
      this.currentIdx = 0;
      return ;
    }
  }

  private _renderTabBar(props: any) : JSX.Element {
    return (
      <TabBar
        {...props}
        activeColor="#4F4F4F"
        inactiveColor="#828282"
        tabStyle={{
          backgroundColor: '#fff',
          width: 'auto'
        }}
        indicatorContainerStyle={styles.indicatorContainerStyle}
        pressColor="#fff"
        contentContainerStyle={styles.tabContainer}
        renderLabel={({ route, color }) => {
          return (
            <Text style={[ {...styles.tabText, color }]}>{route.title}</Text>
          )
        }}
      />
    );
  }

  private _renderActive() : JSX.Element {
    return (
      <View style={styles.activeContainer}>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Tasks</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Rewards</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        {/*<FlatList*/}
        {/*  data={MOCKS}*/}
        {/*  renderItem={({item}) => <RewardListItem navigation={this.props.navigation}  onPress={() => {}} item={item} />}*/}
        {/*/>*/}
      </View>
    );
  }

  private _renderArchive() : JSX.Element {
    return (
      <View style={styles.activeContainer}>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Tasks</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Rewards</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        {/*<FlatList*/}
        {/*  data={MOCKS}*/}
        {/*  renderItem={({item}) => <RewardListItem navigation={this.props.navigation}  onPress={() => {}} item={item} />}*/}
        {/*/>*/}
      </View>
    );
  }

  private renderScene = ({ route } : any) => {
    switch (route.key) {
      case Tabs.ACTIVE:
        return this._renderActive();
      case Tabs.ARCHIVE:
        return this._renderArchive();
      default:
        return null;
    }
  }

  public render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Header
          centerComponent={{ text: 'Apple' }}
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          backgroundColor="#fff"
        />
        <View style={styles.avatarContainer}>
          <Avatar
            source={{ uri: `https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png` }}
            size="large"
            rounded
          />
        </View>
        <View style={styles.textParagraphContainer}>
          <Text style={styles.textParagraph}>
            Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.          </Text>
        </View>
        <TabView
          navigationState={{ index: this.currentIdx, routes }}
          onIndexChange={this.switchTab}
          renderTabBar={this._renderTabBar}
          renderScene={this.renderScene}
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  listHeaderContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  textParagraphContainer: {
    padding: 6,
  },
  activeContainer: { padding: 0, backgroundColor: '#F8F8F8' },
  textParagraph: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    color: '#4F4F4F',
    letterSpacing: -0.4
  },
  tabContainer: { backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0 },
  indicatorContainerStyle: {
    flex: 1, height: 10,  backgroundColor: 'red'
  },
  tabText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#4F4F4F',
    letterSpacing: -0.4
  },
  listTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
    color: '#4F4F4F',
  },
  seeAll: {
    color: '#3785F7',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
  }
});
