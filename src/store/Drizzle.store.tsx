import { Drizzle, generateStore } from 'drizzle';
import drizzleOptions from './Drizzle.options';

const PRIORITY_METHODS = [
  'getTasksCount',
  'getRewardsCount',
  'geUsersCount',
  'getPartnersCount',
  'getAdminsCount',
];

export class DrizzleStore {
  public drizzle: Drizzle;
  private contract: any;

  public async start(): Promise<{}> {
    return new Promise<any>(async (resolve, reject) => {
      if (!this.drizzle) {
        const drizzleStore = generateStore({drizzleOptions});
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
          this.contract = this.drizzle.contracts.PointX.methods;
          this.initializePriorityMethods()
          resolve();
        } else {
          reject('Error');
        }
      }
    });
  }

  private initializePriorityMethods() {
    PRIORITY_METHODS.map((method) => this.contract[method].cacheCall());
  }

  public async callMethod(methodName: string, ...args: any[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if (!this.drizzle) {
        reject('No drizzle');
        return;
      }

      let state = this.drizzle && this.drizzle.store && this.drizzle.store.getState();
      if (state.drizzleStatus.initialized && this.contract[methodName]) {
        const dataKey = this.contract[methodName].cacheCall(...args);

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

  private async _delay(timeout: number) {
    return new Promise<any>((res) => setTimeout(res, timeout));
  }
}
