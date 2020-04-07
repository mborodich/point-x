import DataStore from './DataStore';


// forms
import LoginStore from './forms/LoginStore';
import NewAccStore from './forms/NewAccStore';
import PhoneStore from './forms/PhoneStore';
import SmsStore from './forms/SmsStore';


export interface IStores {
  dataStore: DataStore;
  loginStore: LoginStore;
  newAccStore: NewAccStore;
  phoneStore: PhoneStore;
  smsStore: SmsStore;
}

export {
  DataStore,
  LoginStore,
  NewAccStore,
  PhoneStore,
  SmsStore
};

export default {
  dataStore: new DataStore(),
  loginForm: new LoginStore(),
  newAccForm: new NewAccStore(),
  phoneForm: new PhoneStore(),
  smsForm: new SmsStore()
};
