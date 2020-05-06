import { action, computed, observable } from 'mobx';
import Web3 from 'web3';
import {isEmpty, request, getCredentialsFromMnemonic} from '@app/utils';
import {HistoryItem, Partner, Reward, User} from '@app/shared/types';
import AsyncStorage from '@react-native-community/async-storage'; // todo: remove this for mnemonic because is not safe.
// @ts-ignore
import * as bip39 from 'react-native-bip39';

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/29bb7426ec9b45279ba484700144d617'));

export interface IContractData {
  args: {};
  fnIndex: number;
  value: string;
  error?: any;
}

export type PointXStore = {
  user: User;
};

export class PointX {
  @observable public store : PointXStore = {
    user: {
      address: '',
      pubKey: '',
      privKey: ''
    }
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
  async getUserCredentials() {
    const mnemonics = await AsyncStorage.getItem('@login');
    if (mnemonics && bip39.validateMnemonic(mnemonics)) {
      const { address, privKey, pubKey } = await getCredentialsFromMnemonic(mnemonics);
      return {
        address,
        privKey,
        pubKey
      }
    }
    return undefined;
  }

  @action.bound
  async handleMnemonic(v: string) : Promise<any> {
    if (bip39.validateMnemonic(v)) {
      await AsyncStorage.setItem('@login', v);
      const { address, privKey, pubKey } = await getCredentialsFromMnemonic(v);

      console.log('Address ->', address);
      return {
        address,
        privKey,
        pubKey
      }
    } else {
      throw new Error(`Invalid mnemonic`);
    }
  }

  @action.bound
  async createNewUserWithMnemonic(name: string) : Promise<void> {
    const mnemonics = await bip39.generateMnemonic();
    const { address } = await this.handleMnemonic(mnemonics);
    await request({
      endpoint: '/confirmNewUser',
      opts: {method: 'POST'},
      payload: { address, name }
    });
  }

  @action.bound
  public fetchTasksCount(): void {
    this.contractsCall.getTasksCount.cacheCall();
  }

  @action.bound
  public fetchRewardsCount(): void {
    this.contractsCall.getRewardsCount.cacheCall();
  }

  @action.bound
  public fetchUsersCount(): void {
    this.contractsCall.getUsersCount.cacheCall();
  }

  @action.bound
  public fetchPartnersCount(): void {
    this.contractsCall.getPartnersCount.cacheCall();
  }

  @action.bound
  public fetchAdminsCount(): void {
    this.contractsCall.getAdminsCount.cacheCall();
  }

  @action.bound
  public fetchTaskById(id: number): void {
    this.contractsCall.getTask.cacheCall(id);
  }

  @action.bound
  public fetchRewardById(id: number): void {
    this.contractsCall.getReward.cacheCall(id);
  }

  @action.bound
  public fetchPartnerById(id: number): void {
    this.contractsCall.getPartnerByNumber.cacheCall(id);
  }

  @action.bound
  async fetchTokenBalance() : Promise<void> {
    const { address } = await this.getUserCredentials();
    if (web3.utils.isAddress(address)) {
      this.contractsCall.getTokenBalance.cacheCall(address);
    }
  }

  @action.bound
  public fetchRewardResultByUserAddress(rewardId: number, userAddress: string) : void {
    // console.log('fetchRewardResultByUserAddress', rewardId, userAddress);
    this.contractsCall.getRewardResultByAddress.cacheCall(rewardId, userAddress);
  }

  @action.bound
  public fetchTaskResultByUserAddress(taskId: number, userAddress: string) : void {
    console.log('fetchTaskResultByUserAddress', taskId, userAddress);
    this.contractsCall.getTaskResultByAddress.cacheCall(taskId, userAddress);
  }

  @action.bound
  async fetchUserHistory() : Promise<void> {
    const { address } = await this.getUserCredentials();
    this.fetchTaskResultByUserAddress(2, '0x0065a05a6e05f17869fe9f0daf65333ad17d7791');
    const taskLength = this.tasksCount;
    const rewardsLength = this.rewardsCount;
    Array.from({ length: taskLength }, (_, i) => {
      try { this.fetchTaskResultByUserAddress(i + 1, address) }
      catch (error) {}
    });
    Array.from({ length: rewardsLength }, (_, i) => {
      try { this.fetchRewardResultByUserAddress(i + 1, address) }
      catch (error) {}
    });

  }

  @action.bound
  async completeReward(id: number) : Promise<void> {
    const { address, privKey } = await this.getUserCredentials();
    const res = await request({
      endpoint: '/completeReward',
      opts: { method: 'POST' },
      payload: { id, address, privKey }
    });
    console.log('Result is over here, look over ->', res);
  }

  @action.bound
  async completeTask(id: number, answers: string[] | number[]) : Promise<void> {
    const { address, privKey } = await this.getUserCredentials();
    const res = await request({
      endpoint: '/completeTask',
      opts: { method: 'POST' },
      payload: { id, answers, address, privKey }
    });
    console.log('Result is over here, look over ->', res);
  }

  @action.bound
  public fetchPartnerByAddress(address: string): void {
    // console.log('fetchPartnerByAddress', address);
    this.contractsCall.getPartnerByAddress.cacheCall(address);
  }

  @action.bound
  public fetchAllTasks(): void {
    const length = this.tasksCount;
    Array.from({ length }, (_, i) => {
      this.fetchTaskById(i + 1);
    });
  }

  @action.bound
  public fetchAllPartners(): void {
    const length = this.partnersCount;

    this.fetchPartnerById(1);
    this.fetchPartnerById(2);
    this.fetchPartnerById(3);
    this.fetchPartnerById(4);
    this.fetchPartnerById(5);
  }

  @action.bound
  public fetchAllRewards(): void {
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
          const partner = this.selectPartnerByOwner(tasks[e].value[4]);
          const memo = tasks[e].value;
          memo.push(partner);
          results.push(memo);
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
        if (partners[e] && partners[e].value && partners[e].value[0] !== '') {
          const [
            name,
            description,
            logo,
            account,
            number
          ] = partners[e].value;
          results.push({ account, name, description, logo, number });
        }
      });
    }
    return results.length > 0 ? results : undefined;
  }

  @action.bound
  public selectPartnerByOwner(owner: string) : Partner[] {
    return this.partnersList &&
      this.partnersList.find((i : Partner) => i.account === owner) || [];
  }

  @action.bound
  public selectRewardsByPartner(partnerAddress: string) : Reward[] {
    return this.rewardsList &&
      this.rewardsList.filter((i : Reward) => i.owner === partnerAddress) || [];
  }

  @action.bound
  public selectTasksByPartner(partnerAddress: string) {
    return this.tasksList &&
      this.tasksList.filter((i: any[]) => {
        return i[4] === partnerAddress; // i[4] - task owner;
      });
  }

  @action.bound
  public selectTaskById(id: number) : any[] {
    return this.tasksList &&
      this.tasksList.find(i => i[10].id === id) // i[10] - task id
  }

  @action.bound
  public selectRewardById(id: number) : Reward {
    return this.rewardsList &&
      this.rewardsList.find((i: Reward) => i.number === id) // i[10] - task id
  }

  @computed
  public get historyCount() {
    return (this.userHistory && this.userHistory.length) || 0;
  }

  @computed // todo: make cleaner and perfomance optimize
  public get userHistory() {
    const rewardResults = this.contractsGet.getRewardResultByAddress;
    const taskResults = this.contractsGet.getTaskResultByAddress;

    console.log('task len history ->', taskResults && taskResults.length);
    console.log('reward len history ->', rewardResults && rewardResults.length);


    const historyResults : HistoryItem[] = [];
    if (rewardResults && !isEmpty(rewardResults)) {
      const keys = Object.keys(rewardResults);
      keys.map(e => {
        if (rewardResults[e].value && rewardResults[e].value[0] !== '' ) {
          const [status, _, __, rewardId] = rewardResults[e].value;
          if (status && parseInt(status) === 1) {
            const { caption : name, description, value, image } = this.selectRewardById(parseInt(rewardId));
            historyResults.push({
              date: '21 Nov', // todo: Kirill should add dates to results
              name,
              description,
              value,
              image,
              id: rewardId,
              type: 'reward'
            });
          }
        }
      });
    } else if (taskResults && !isEmpty(taskResults)) {
      const keys = Object.keys(taskResults);
      keys.map(e => {
        if (taskResults[e].value && taskResults[e].value[0] !== '' ) {
          const taskId : number = parseInt(taskResults[e].value[3]);
          const [name, description, image, value] = this.selectTaskById(taskId);
          historyResults.push({
            date: '21 Nov',
            type: 'task',
            name,
            description,
            image,
            value,
            taskId
          });
        }
      });
    }

    console.log('len history ->', historyResults && historyResults.length);

    return historyResults.length > 0 ? historyResults : undefined;
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

          const partner = this.selectPartnerByOwner(owner);

          results.push({
            caption,
            description,
            image,
            value,
            owner,
            status,
            totalAmount,
            resultsAmount,
            number,
            partner
          });
        }
      })
    }
    return results.length > 0 ? results : undefined;
  }


  @computed
  public get userBalance() {
    const userBalance = this.contractsGet.getTokenBalance;
    if (!isEmpty(userBalance)) {
      const [key] = Object.keys(userBalance);
      return parseInt(userBalance[key].value);
    }
    return 0;
  }

  @computed
  public get tasksCount() {
    const tasksCount = this.contractsGet.getTasksCount;
    if (!isEmpty(tasksCount)) {
      const key = Object.keys(tasksCount)[0];
      return parseInt(tasksCount[key].value);
    }
    return 10;
  }

  @computed
  public get rewardsCount() {
    const rewardsCount = this.contractsGet.getRewardsCount;
    if (!isEmpty(rewardsCount)) {
      const [key] = Object.keys(rewardsCount);
      return parseInt(rewardsCount[key] && rewardsCount[key].value);
    }
    return 10;
  }

  @computed
  public get partnersCount() {
    const partnersCount = this.contractsGet.getPartnersCount;
    if (!isEmpty(partnersCount)) {
      const [key] = Object.keys(partnersCount);
      return parseInt(partnersCount[key] && partnersCount[key].value);
    }
    return 10;
  }
}
