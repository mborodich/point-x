// forms
import LoginStore from './forms/LoginStore';
import NewAccStore from './forms/NewAccStore';
import PhoneStore from './forms/PhoneStore';
import SmsStore from './forms/SmsStore';

// stores
import RewardsStore from './stores/RewardsStore';
import UserStore from './stores/UserStore';

export interface IStores {
  loginStore: LoginStore;
  newAccStore: NewAccStore;
  phoneStore: PhoneStore;
  smsStore: SmsStore;
  rewardsStore: RewardsStore;
  userStore: UserStore;
}

export {
  LoginStore,
  NewAccStore,
  PhoneStore,
  SmsStore,
  RewardsStore,
  UserStore
};

export default {
  loginForm: new LoginStore(),
  newAccForm: new NewAccStore(),
  phoneForm: new PhoneStore(),
  smsForm: new SmsStore(),
  rewardsStore: new RewardsStore(),
  userStore: new UserStore()
};
