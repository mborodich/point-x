import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './src/navigation';
import stores from './src/store';
import { Provider } from 'mobx-react';

const Stores = React.createContext({});
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <Stores.Provider value={stores}>
          <NavigationContainer>
            <AppScreens />
          </NavigationContainer>
        </Stores.Provider>
      </Provider>
    );
  }
}
