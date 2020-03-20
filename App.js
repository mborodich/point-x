import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './src/navigation';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    );
  }
}
