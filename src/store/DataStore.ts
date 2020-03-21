import { observable, computed, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import { DataHolder } from './DataHolder';
import taskListMockData from './MOCK_DATA.json';

const FETCH_INTERVAL = 3000;

export interface ITaskDataResponseItem {
  caption: string;
  description: string;
  image: string;
  value: number;
  status: boolean;
}

export default class DataStore {
  @observable public items: DataHolder<ITaskDataResponseItem[]> = new DataHolder();
  private _interval: number = 0;

  constructor() {
    // only start data fetching if items is actually used!
    onBecomeObserved(this, "items", this._resume)
    onBecomeUnobserved(this, "items", this._suspend)
  }

  private _resume = () => {
    console.log(`Resuming`);
    this._interval = setInterval(() => this._fetchTaskList(), FETCH_INTERVAL);
  }

  private _suspend = () => {
    console.log(`Suspending`);
    clearInterval(this._interval);
  }

  private _fetchTaskList = () => {
    console.log(`Fetching the data`);
    try {
      this.items.setData(taskListMockData || []);
    } catch (e) {
      this.items.setError({msg: e});
      console.log('Error fetching the data:' + e);
    }
  }

  @computed
  public get taskList() {
    return this.items.isReady() && this.items.d;
  }
};
