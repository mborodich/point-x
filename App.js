import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './src/navigation';
import { DrizzleContext } from '@drizzle/react-plugin';
import drizzleOptions from './src/store/Drizzle.options';
import { Drizzle, generateStore } from 'drizzle';

console.disableYellowBox = true;

// const store = new DrizzleStore();
// store.start().then();

const drizzleStore = generateStore({ drizzleOptions });
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

export default class App extends React.Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <NavigationContainer>
          <AppScreens/>
        </NavigationContainer>
      </DrizzleContext.Provider>
    );
  }
}
