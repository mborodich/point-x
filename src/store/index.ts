import DataStore from './DataStore';

export interface IStores {
  dataStore: DataStore;
}

export {
  DataStore,
};

export default {
  dataStore: new DataStore(),
};
