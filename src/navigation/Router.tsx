import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { PartnerScreen } from '../screens/PartnerScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { View } from 'react-native';
import { TaskItemScreen } from '../screens/TaskItemScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TAB_COLOR = '#00aced';

const TasksStack = function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksScreen"
        component={TasksScreen}
      />
      <Stack.Screen
        name="PartnerScreen"
        component={PartnerScreen}
      />
      <Stack.Screen
        name="TaskItemScreen"
        component={TaskItemScreen}
      />
    </Stack.Navigator>
  )
}

export function AppScreens() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon name='home' type='font-awesome' color={TAB_COLOR}/>
          ),
        }}
      />
      <Tab.Screen
        name="TasksScreen"
        component={TasksStack}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: () => (
            <Icon name='list' type='font-awesome' color={TAB_COLOR}/>
          ),
        }}
      />
      <Tab.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: () => (
            <Icon name='gift' type='font-awesome' color={TAB_COLOR}/>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={() => <View/>}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Icon name='user-circle' type='font-awesome' color={TAB_COLOR}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
