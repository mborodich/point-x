import { action, observable, computed } from "mobx";

type ListView = 'grid' | 'list';

export default class RewardsStore {
  @observable
  listView : ListView = 'list';

  @action.bound toggleListView() : void {
    if (this.listView === 'list') this.listView = 'grid';
    if (this.listView === 'grid') this.listView = 'list';
  }

  @computed get columnsNum() {
    if (this.listView === 'list') return 1;
    if (this.listView === 'grid') return 2;
    return ;
  }
}
