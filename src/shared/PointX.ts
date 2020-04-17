import { action, computed, observable } from 'mobx';

export interface IContractData {
  args: {};
  fnIndex: number;
  value: string;
  error?: any;
}

export interface IPointX {
  contractResponse: IContractData;
}

export class PointX {
  @observable public store = {
    getTasksCount: 0,
    tasks: {}
  };
  private contractsCall: any;
  private contractsGet: any;

  constructor(contractsCall: any, contractsGet: any) {
    this.contractsCall = contractsCall;
    this.contractsGet = contractsGet;
  }


  @action.bound
  public fetchTasksCount() {
    const key = this.contractsCall.getTasksCount.cacheCall();
    this.store['getTasksCount'] = key;
  }

  @computed
  public get tasksCount() {
    const key = this.store['getTasksCount'];
    return key ? this.contractsGet.getTasksCount[key] : undefined;
  }

  @action.bound
  public fetchTaskById(id: number) {
    const key = this.contractsCall.getTask.cacheCall(id);
    this.store.tasks[id] = key;
  }

  @action.bound
  public getTaskById(id: number): IContractData {
    const key = this.store.tasks[id];
    return this.contractsGet.getTask[key];
  }

  @action.bound
  public fetchAllTasks() {
    const length = this.store['getTasksCount'].value;
    Array.from({ length }, (_, i) => {
      this.fetchTaskById(i + 1);
    });
  }
}
