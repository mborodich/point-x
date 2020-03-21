import { action, observable, computed, } from 'mobx';
import { DataHolder } from './DataHolder';
import taskListMockData from './MOCK_DATA.json';

const FETCH_LIMIT = 5;

export interface ITaskDataResponseItem {
  caption: string;
  description: string;
  image: string;
  value: number;
  status: boolean;
}

export default class DataStore {
  @observable public items: DataHolder<ITaskDataResponseItem[]> = new DataHolder();
  @observable isLoading: boolean = false;
  @observable private _page: number = 1;

  constructor() {
    this._fetchTaskList();
  }

  private _fetchTaskList = () => {
    const offset = this._page * FETCH_LIMIT;
    try {
      const prevousData = this.items.d || [];
      const newData = taskListMockData.slice(offset - FETCH_LIMIT, offset)
      this.items.setData(prevousData.concat(newData));
    } catch (e) {
      this.items.setError({msg: e});
      console.log('Error fetching the data:' + e);
    }
  }

  @computed
  public get taskList() {
    return this.items.d;
  }

  @action
  public loadMore() {
    this._page++;
    this._fetchTaskList();
  }

  @action
  public refresh() {
    this._page = 1;
    this.items.setData([]);
    this._fetchTaskList();
  }
};
