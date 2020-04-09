// forms
import LoginStore from './forms/LoginStore';
import NewAccStore from './forms/NewAccStore';
import PhoneStore from './forms/PhoneStore';
import SmsStore from './forms/SmsStore';

export interface IStores {
  loginStore: LoginStore;
  newAccStore: NewAccStore;
  phoneStore: PhoneStore;
  smsStore: SmsStore;
}

export {
  LoginStore,
  NewAccStore,
  PhoneStore,
  SmsStore
};

export default {
  loginForm: new LoginStore(),
  newAccForm: new NewAccStore(),
  phoneForm: new PhoneStore(),
  smsForm: new SmsStore()
};
