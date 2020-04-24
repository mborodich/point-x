import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import { LoginScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { PartnerScreen } from '../screens/PartnerScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { TaskItemScreen } from '../screens/TaskItemScreen';
import { RewardItemScreen } from '../screens/RewardItemScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

import { Mnemonics } from '@app/screens/SettingsScreen/Mnemonics';
import { HistoryScreen } from "@app/screens/SettingsScreen/History";
import { UserRewardsScreen } from "@app/screens/SettingsScreen/Rewards";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TAB_COLOR = '#00aced';

const TasksStack = function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{
          title: "Tasks",
          cardStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name="TaskItemScreen"
        component={TaskItemScreen}
        options={{
          title: "Starbucks",
        }}
      />
      <Stack.Screen
        name="RewardItemScreen"
        component={RewardItemScreen}
      />
    </Stack.Navigator>
  );
};


const Tabs = function () {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: TAB_COLOR
      }}
      lazy={false}
      initialRouteName="AuthScreen"
      backBehavior={'history'}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon name="home" type="font-awesome" color={TAB_COLOR} />
          ),
        }}
      />
      <Tab.Screen
        name="TasksScreen"
        component={TasksStack}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: () => (
            <Icon name="list" type="font-awesome" color={TAB_COLOR} />
          ),
        }}
      />
      <Tab.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: () => (
            <Icon name="gift" type="font-awesome" color={TAB_COLOR} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Icon name="user-circle" type="font-awesome" color={TAB_COLOR} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export function AppScreens() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="AuthScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Application"
        component={Tabs}
      />
      <Stack.Screen
        name="RewardItemScreen"
        component={RewardItemScreen}
      />
      <Stack.Screen
        name="PartnerScreen"
        component={PartnerScreen}
      />
      <Stack.Screen
        name="Mnemonics"
        component={Mnemonics}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />
      <Stack.Screen
        name="RewardsHistory"
        component={UserRewardsScreen}
      />
    </Stack.Navigator>
  );
}
