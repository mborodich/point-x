import { Drizzle, generateStore } from 'drizzle';
import drizzleOptions from './Drizzle.options';

const PRIORITY_METHODS = [
  'getTasksCount',
  'getRewardsCount',
  // 'geUsersCount',
  'getPartnersCount',
  'getAdminsCount',
];

export class DrizzleStore {
  public drizzle: Drizzle;
  private contract: any;
  private eventSubscriptions: {
    [eventName: string]: string;
  };

  constructor(drizzle: any) {
    this.eventSubscriptions = {};
    this.drizzle = drizzle;
  }

  public async start(): Promise<{}> {
    return new Promise<any>(async (resolve, reject) => {
      if (!this.drizzle) {
        this.eventSubscriptions = {};
        const drizzleStore = generateStore({ drizzleOptions });
        this.drizzle = new Drizzle(drizzleOptions, drizzleStore);
        let state = {
          drizzleStatus: {
            initialized: false,
          },
        };

        while (state.drizzleStatus && !state.drizzleStatus.initialized) {
          state = this.drizzle && this.drizzle.store.getState();
          await this._delay(500);
        }


        if (state.drizzleStatus && state.drizzleStatus.initialized) {
          this.contract = this.drizzle.contracts.PointX;

          this.subscribeEvent('getTasksCount', (e) => {
            console.log('eeee', e);
          });


          this._initializePriorityMethods();
          resolve();
        } else {
          reject('Error');
        }
      }
    });
  }

  public subscribeEvent(
    eventName: string,
    callback: (error: any, evt: any) => void,
    args: any = {},
  ) {
    const state = this.drizzle && this.drizzle.store && this.drizzle.store.getState();
    const { events } = this.contract;
    console.log('1111');

    if (!state || !state.drizzleStatus.initialized || !events[eventName]) {
      return;
    }

    if (this.eventSubscriptions[eventName]) {
      return;
    }

    this.eventSubscriptions[eventName] = eventName;

    events[eventName]({ ...args }).on('data', (evt) => {
      callback(null, evt);
    });
  }

  public unsubscribeEvent(eventName: string) {
    if (this.eventSubscriptions[eventName]) {
      // TODO: [mr] remove listener
      delete this.eventSubscriptions[eventName];
    }
  }

  public unsubscribeAllEvents() {
    Object.keys(this.eventSubscriptions).forEach((key) => {
      // TODO: [mr] remove listener
      delete this.eventSubscriptions[key];
    });
  }

  public async callMethod(methodName: string, ...args: any[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if (!this.drizzle) {
        reject('No drizzle');
        return;
      }

      let state = this.drizzle && this.drizzle.store && this.drizzle.store.getState();
      if (state.drizzleStatus.initialized && this.contract.methods[methodName]) {
        const dataKey = this.contract.methods[methodName].cacheCall(...args);

        while (!state.contracts.PointX[methodName][dataKey]) {
          state = this.drizzle.store.getState();
          await this._delay(100);
        }

        if (state.contracts.PointX[methodName] && state.contracts.PointX[methodName][dataKey]) {
          resolve(state.contracts.PointX[methodName][dataKey].value || []);
          return;
        }
      }

      reject('callMethod issue');
    });
  }

  private _initializePriorityMethods() {
    PRIORITY_METHODS.map((method) => this.contract.methods[method].cacheCall());
  }

  private async _delay(timeout: number) {
    return new Promise<any>((res) => setTimeout(res, timeout));
  }
}
