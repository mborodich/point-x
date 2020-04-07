import { observable, action } from "mobx";
import FormGeneric from './FormGeneric';

class SmsStore extends FormGeneric {
  @observable
  form = {
    fields: {
      sms: {
        value: '',
        error: null,
        rule: 'required|string',
        placeholder: 'SMS-code'
      }
    },
    meta: {
      isValid: false,
      error: null
    }
  };

  @action
  async onSubmit() {
    // async stuff
  }
}

export default SmsStore;
