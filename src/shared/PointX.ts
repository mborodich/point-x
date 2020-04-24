import { action, computed, observable } from 'mobx';
import {createTransformer} from 'mobx-utils';
import web3 from 'web3';
import { isEmpty } from '@app/utils';

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
    getRewardsCount: 0,
    tasks: {},
    rewards: {},
    history: {}
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
    this.fetchAllRewards();
    this.fetchAllPartners();
  }

  @action.bound
  public fetchTasksCount() : void {
    this.contractsCall.getTasksCount.cacheCall();
  }

  @action.bound
  public fetchRewardsCount() : void {
    this.contractsCall.getRewardsCount.cacheCall();
  }

  @action.bound
  public fetchUsersCount() : void {
    this.contractsCall.getUsersCount.cacheCall();
  }

  @action.bound
  public fetchPartnersCount() : void {
    this.contractsCall.getPartnersCount.cacheCall();
  }

  @action.bound
  public fetchAdminsCount() : void {
    this.contractsCall.getAdminsCount.cacheCall();
  }

  @action.bound
  public fetchTaskById(id: number) : void {
    this.contractsCall.getTask.cacheCall(id);
  }

  @action.bound
  public fetchRewardById(id: number) : void {
    this.contractsCall.getReward.cacheCall(id);
  }

  @action.bound
  public fetchPartnerById(id: number) : void {
    this.contractsCall.getPartnerByNumber.cacheCall(id);
  }

  @action.bound
  public fetchPartnerByAddress(address: string) : void {
    if (web3.utils.isAddress(address)) {
      this.contractsCall.getPartnerByAddress.cacheCall(address);
    }
  }

  @action.bound
  public fetchAllTasks() : void {
    const length = this.tasksCount;
    Array.from({ length }, (_, i) => {
      this.fetchTaskById(i + 1);
    });
  }

  @action.bound
  public fetchAllPartners() : void {
    const length = this.partnersCount;
    Array.from({ length }, (_, i) => {
      try {this.fetchPartnerById(i + 1);}
      catch(e) {}
    });
  }

  @action.bound
  public fetchAllRewards() : void {
    const length = this.rewardsCount;
    Array.from({ length }, (_, i) => {
      this.fetchRewardById(i + 1);
    });
  }

  @computed
  public get tasksList() {
    const tasks = this.contractsGet.getTask;
    const results: any[] = [];
    if (!isEmpty(tasks)) {
      const keys = Object.keys(tasks);
      keys.map(e => {
        if (tasks[e].value[0] !== '') {
          results.push(tasks[e].value);
        }
      })
    }
    return results.length > 0 ? results : undefined;
  }

  @computed
  public get partnersList() {
    const partners = this.contractsGet.getPartnerByNumber;
    const results: any[] = [];
    if (!isEmpty(partners)) {
      const keys = Object.keys(partners);
      keys.map(e => {
        if (partners[e].value[0] !== '') {
          const [
            name,
            description,
            logo,
            account,
            number
          ] = partners[e].value;
          console.log('Name )', name);
          results.push({ account, name, description, logo, number });
        }
      });
    }
    return results.length > 0 ? results : undefined;
  }

  @computed
  public get selectPartnerByOwner() {
    return createTransformer((owner: string) => {
      console.log(this.partnersList);
      return this.partnersList && this.partnersList.find((i) => i.account === owner)
    })
  }

  @computed
  public get rewardsList() {
    const rewards = this.contractsGet.getReward;
    const results: any[] = [];
    if (!isEmpty(rewards)) {
      const keys = Object.keys(rewards);
      keys.map(e => {
        if (rewards[e].value[0] !== '') {
          const [
            caption,
            description,
            image,
            value,
            owner,
            status,
            totalAmount,
            resultsAmount,
            number
          ] = rewards[e].value;

          results.push({
            caption,
            description,
            image,
            value,
            owner,
            status,
            totalAmount,
            resultsAmount,
            number
          });
        }
      })
    }
    return results.length > 0 ? results : undefined;
  }

  @computed
  public get tasksCount() {
    const tasksCount = this.contractsGet.getTasksCount;
    if (!isEmpty(tasksCount)) {
      const key = Object.keys(tasksCount)[0];
      return tasksCount[key].value;
    }
    return 10; // Here should be default minimal number of tasks, in that case we don't have to wait till it loaded
  }

  @computed
  public get rewardsCount() {
    const rewardsCount = this.contractsGet.getRewardsCount;
    if (!isEmpty(rewardsCount)) {
      const [key] = Object.keys(rewardsCount);
      return rewardsCount[key] && rewardsCount[key].value;
    }
    return 10;
  }

  @computed
  public get partnersCount() {
    const partnersCount = this.contractsGet.getPartnersCount;
    if (!isEmpty(partnersCount)) {
      const [key] = Object.keys(partnersCount);
      console.log('Partners count ->', partnersCount[key]);
      return partnersCount[key] && partnersCount[key].value;
    }
  }
}
