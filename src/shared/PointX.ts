import { action, computed, observable } from 'mobx';
import web3 from 'web3';
import E16 from '@app/utils/E16';
import { isEmpty, request } from '@app/utils';
import {HistoryItem, Partner, Reward, User} from '@app/shared/types';
import AsyncStorage from '@react-native-community/async-storage'; // todo: remove this for mnemonic because is not safe.
import * as bip39 from 'react-native-bip39';
// @ts-ignore
import hdKey from 'ethereumjs-wallet/hdkey';

export interface IContractData {
  args: {};
  fnIndex: number;
  value: string;
  error?: any;
}

export type PointXStore = {
  user: User;
};

export interface IPointX {
  contractResponse: IContractData;
}

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
    if (this.store.user)
      this.fetchTokenBalance(this.store.user.address);
  }

  @action.bound
  async handleMnemonic(v: string) : Promise<void> {
    if (bip39.validateMnemonic(v)) {
      await AsyncStorage.setItem('@login', v);
      const seed = await bip39.mnemonicToSeed(v);
      const hdwallet = hdKey.fromMasterSeed(seed);
      const path = "m/44'/60'/0'/0/0";
      const wallet = hdwallet.derivePath(path).getWallet();
      const address = `0x${wallet.getAddress().toString('hex')}`;
      const privKey = wallet.getPrivateKeyString();
      const pubKey = wallet.getPublicKeyString();
      Object.assign(this.store.user, { address, privKey, pubKey });

      console.log(this.store.user);
    } else {
      throw new Error(`Invalid mnemonic`);
    }
  }

  @action.bound
  async createNewUserWithMnemonic(name: string) : Promise<void> {
    const mnemonics = await bip39.generateMnemonic();
    await this.handleMnemonic(mnemonics);
    const { address } = this.store.user;
    await request({ endpoint: '/confirmNewUser', opts: {method: 'POST'}, payload: { address, name } });
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
  public fetchTokenBalance(address: string) : void {
    if (web3.utils.isAddress(address)) {
      this.contractsCall.getTokenBalance.cacheCall(address);
    }
  }

  @action.bound
  public fetchRewardResultByUserAddress(rewardId: number, userAddress: string) : void {
    this.contractsCall.getRewardResultByAddress.cacheCall(rewardId, userAddress);
  }

  @action.bound
  public fetchTaskResultByUserAddress(taskId: number, userAddress: string) : void {
    this.contractsCall.getTaskResultByAddress.cacheCall(taskId, userAddress);
  }

  @action.bound
  public fetchUserHistory() : void {
    const taskLength = this.tasksCount;
    const rewardsLength = this.rewardsCount;
    Array.from({ length: taskLength }, (_, i) => {
      try { this.fetchTaskResultByUserAddress(i + 1, this.store.user.address) }
      catch (error) {}
    });
    Array.from({ length: rewardsLength }, (_, i) => {
      try { this.fetchRewardResultByUserAddress(i + 1, this.store.user.address) }
      catch (error) {}
    });
  }

  @action.bound
  public completeReward(id: number) : void {
    this.contractsCall.completeReward.cacheSend(id, {from: this.store.user.address});
  }

  @action.bound
  public completeTask(id: number, answersArr: string[] | number[]) : void {
    this.contractsCall.completeTask.cacheSend(id, E16.encodeArr(answersArr), {from: this.store.user.address});
  }

  @action.bound
  public fetchPartnerByAddress(address: string): void {
    if (web3.utils.isAddress(address)) {
      this.contractsCall.getPartnerByAddress.cacheCall(address);
    }
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
    Array.from({ length }, (_, i) => {
      try { this.fetchPartnerById(i + 1); }
      catch (e) { }
    });
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
          results.push({ account, name, description, logo, number });
        }
      });
    }
    return results.length > 0 ? results : undefined;
  }

  @action.bound
  public selectPartnerByOwner(owner: string) : Partner[] {
    return this.partnersList &&
      this.partnersList.filter((i : Partner) => i.account === owner) || [];
  }

  @action.bound
  public selectRewardsByPartner(partnerAddress: string) : Reward[] {
    return this.rewardsList &&
      this.rewardsList.filter((i : Reward) => i.owner === partnerAddress) || [];
  }

  @action.bound
  public selectTasksByPartner(partnerAddress: string) {
    return this.tasksList &&
      this.tasksList.find((i: any[]) => {
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

  @computed // todo: make cleaner and perfomance optimize
  public get userHistory() {
    const rewardResults = this.contractsGet.fetchRewardResultByUserAddress;
    const taskResults = this.contractsGet.fetchTaskResultByUserAddress;
    const historyResults : HistoryItem[] = [];
    if (!isEmpty(rewardResults)) {
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
              image
            });
          }
        }
      });
    } else if (!isEmpty(taskResults)) {
      const keys = Object.keys(taskResults);
      keys.map(e => {
        if (taskResults[e].value && taskResults[e].value[0] !== '' ) {
          const taskId : number = parseInt(taskResults[e].value[3]);
          const [name, description, image, value] = this.selectTaskById(taskId);
          historyResults.push({
            date: '21 Nov',
            name,
            description,
            image,
            value
          });
        }
      });
    }
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
            partner: this.partnersList && this.selectPartnerByOwner(owner),
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
      return parseInt(userBalance[key].value)
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
    return 10; // Here should be default minimal number of tasks, in that case we don't have to wait till it loaded
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
    return 3;
  }
}
