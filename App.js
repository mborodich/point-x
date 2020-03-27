import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './src/navigation';
import stores from './src/store';
import { Provider } from 'mobx-react';
import { Drizzle, generateStore } from 'drizzle';
import PointX from 'pointxio-contracts/build/contracts/PointX';
import { DrizzleContext } from 'drizzle-react';

console.disableYellowBox = true;


const options = {
  contracts: [PointX],
  polls: {
    accounts: 10000,
    blocks: 10000,
  },
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545',
    },
  },
};

const drizzleStore = generateStore({ drizzleOptions: options });
const drizzle = new Drizzle(options, drizzleStore);

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
