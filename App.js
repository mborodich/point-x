import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Provider } from "mobx-react";

import { AppScreens } from './src/navigation';
import drizzleOptions from './src/store/Drizzle.options';
import { Drizzle, generateStore } from '@drizzle/store';
import stores from './src/store';

console.disableYellowBox = true;

// const store = new DrizzleStore();
// store.start().then();

const drizzleStore = generateStore({ drizzleOptions });
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <DrizzleContext.Provider drizzle={drizzle}>
          <NavigationContainer>
            <AppScreens/>
          </NavigationContainer>
        </DrizzleContext.Provider>
      </Provider>
    );
  }
}
