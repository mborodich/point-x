import { computed } from 'mobx';

export interface IContractValue {
  args: {};
  fnIndex: number;
  value: string;
  error?: any;
}

export interface IPointX {
  getTasksCount: IContractValue;
}

export class PointX {
  private drizzle: any;
  private contracts: any;
  private state: any;

  constructor(drizzle: any, state: any) {
    this.drizzle = drizzle;
    this.state = state;
    this.contracts = this.drizzle.contracts.PointX;
  }

  @computed
  public get getTasksCount() {
    return this.contracts.getTasksCount.cacheCall();
  }
}
