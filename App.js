import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './src/navigation';
import stores from './src/store';
import { Provider } from 'mobx-react';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from '@drizzle/react-plugin';
import drizzleOptions from './drizzleOptions';

console.disableYellowBox = true;

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
