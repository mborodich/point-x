import React from 'react';
import { observer } from 'mobx-react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { Avatar, Header, Text } from 'react-native-elements';
import { TabView, TabBar } from 'react-native-tab-view';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';
import { RewardListItem, TabViewWrapper, TaskListItem } from '@app/components';
import { Task } from "@app/shared/types";


interface PartnerScreenProps extends DrizzleProps {
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

@observer
@Drizzle
export class PartnerScreen extends React.Component<PartnerScreenProps> {

  private getTabScenes = () => {
    return ({
      [Tabs.ACTIVE]: this._renderActive(),
      [Tabs.ARCHIVE]: this._renderArchive()
    });
  };

  private _onTaskClick = (task: Task) =>
    this.props.navigation.navigate('TaskItemScreen', { task });

  private _keyExtractor = (_: any, index: any) => `${index}`;

  private _renderActive(): JSX.Element {

    const {route: {params: {partner}}, pointX } = this.props;

    return (
      <View style={styles.activeContainer}>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Tasks</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={pointX.selectTasksByPartner(partner.address)}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <TaskListItem
              task={item}
              theme={this.props.theme}
              onClick={() => this._onTaskClick(item)}
            />
          }
        />
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Rewards</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={pointX.selectRewardsByPartner(partner.address)}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <RewardListItem
              navigation={this.props.navigation}
              item={item}
            />
          }
        />
      </View>
    );
  }

  private _renderArchive(): JSX.Element {

    const {route: {params: {partner}}, pointX } = this.props;

    return (
      <View style={styles.activeContainer}>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Tasks</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={pointX.selectTasksByPartner(partner.address)}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <TaskListItem
              task={item}
              theme={this.props.theme}
              onClick={() => this._onTaskClick(item)}
            />
          }
        />
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listTitle}>Rewards</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={pointX.selectRewardsByPartner(partner.address)}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <RewardListItem
              navigation={this.props.navigation}
              item={item}
            />
          }
        />
      </View>
    );
  }

  public render() {
    const partner = this.props.route.params.partner || {};
    return (
      <ScrollView style={styles.container}>
        <Header
          centerComponent={{ text: partner.name }}
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          backgroundColor="#fff"
        />
        <View style={styles.avatarContainer}>
          <Avatar
            source={{ uri: partner.logo }}
            size="large"
            rounded
          />
        </View>
        <View style={styles.textParagraphContainer}>
          <Text style={styles.textParagraph}>
            {partner.description}
          </Text>
        </View>
        <TabViewWrapper
          routes={routes}
          scenes={this.getTabScenes()}
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
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  textParagraphContainer: {
    padding: 6,
  },
  activeContainer: {
    padding: 0,
    backgroundColor: '#F8F8F8'
  },
  textParagraph: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
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
