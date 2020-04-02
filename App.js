import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './src/navigation';
import { DrizzleContext } from '@drizzle/react-plugin';
import { DrizzleStore } from './src/store/Drizzle.store';

console.disableYellowBox = true;

const store = new DrizzleStore();
store.start().then();

export default class App extends React.Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={store.drizzle}>
        <NavigationContainer>
          <AppScreens/>
        </NavigationContainer>
      </DrizzleContext.Provider>
    );
  }
}
