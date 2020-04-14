// forms
import LoginStore from './forms/LoginStore';
import NewAccStore from './forms/NewAccStore';
import PhoneStore from './forms/PhoneStore';
import SmsStore from './forms/SmsStore';

// stores
import RewardsStore from './stores/RewardsStore';

export interface IStores {
  loginStore: LoginStore;
  newAccStore: NewAccStore;
  phoneStore: PhoneStore;
  smsStore: SmsStore;
  rewardsStore: RewardsStore;
}

export {
  LoginStore,
  NewAccStore,
  PhoneStore,
  SmsStore,
  RewardsStore
};

export default {
  loginForm: new LoginStore(),
  newAccForm: new NewAccStore(),
  phoneForm: new PhoneStore(),
  smsForm: new SmsStore(),
  rewardsStore: new RewardsStore()
};
