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
  public prefetchAll() {
    this.fetchTasksCount();
    this.fetchRewardsCount();
    this.fetchUsersCount();
    this.fetchPartnersCount();
    this.fetchAdminsCount();
    this.fetchAllTasks();
  }

  @action.bound
  public fetchTasksCount() {
    this.contractsCall.getTasksCount.cacheCall();
  }

  @action.bound
  public fetchRewardsCount() {
    this.contractsCall.getRewardsCount.cacheCall();
  }

  @action.bound
  public fetchUsersCount() {
    this.contractsCall.getUsersCount.cacheCall();
  }

  @action.bound
  public fetchPartnersCount() {
    this.contractsCall.getPartnersCount.cacheCall();
  }

  @action.bound
  public fetchAdminsCount() {
    this.contractsCall.getAdminsCount.cacheCall();
  }

  @action.bound
  public fetchTaskById(id: number) {
    this.contractsCall.getTask.cacheCall(id);
  }

  @action.bound
  public fetchAllTasks() {
    const length = this.tasksCount;
    console.log('Fetching tasls...' + length);
    Array.from({ length }, (_, i) => {
      this.fetchTaskById(i + 1);
    });
  }

  @computed
  public get tasksList() {
    const tasks = this.contractsGet.getTask;
    if (!this.isEmpty(tasks)) {
      const keys = Object.keys(tasks);
      return keys.map(e => tasks[e].value)
    }
    return undefined;
  }

  @computed
  public get tasksCount() {
    const tasksCount = this.contractsGet.getTasksCount;

    if (!this.isEmpty(tasksCount)) {
      const key = Object.keys(tasksCount)[0];
      return tasksCount[key].value;
    }

    return 3; // Here should be default minimal number of tasks, in that case we don't have to wait till it loaded
  }

  private isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }
}
