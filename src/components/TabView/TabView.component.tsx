import React from 'react';
import { StyleSheet } from 'react-native';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {TabBar, TabView} from "react-native-tab-view";
import {Text} from "react-native-elements";


type TabRoute = {
  key: string;
  title: string;
};

type Scenes = {
  [key: string] : JSX.Element;
};

type TProps = {
  routes: TabRoute[];
  scenes: Scenes;
};


@observer
export class TabViewWrapper extends React.PureComponent<TProps> {
  @observable currentIdx: number = 0;
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

  private _renderScene = ({ route } : any) => {
    if (!this.props.scenes.hasOwnProperty(route.key)) return null;
    return this.props.scenes[route.key];
  };

  public render() {
    return (
      <TabView
        navigationState={{ index: this.currentIdx, routes: this.props.routes }}
        onIndexChange={this.switchTab}
        renderTabBar={this._renderTabBar}
        renderScene={this._renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#4F4F4F',
    letterSpacing: -0.4
  },
  indicatorContainerStyle: {
    flex: 1,
    height: 10,
    backgroundColor: 'red'
  },
  tabContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0
  }
});
