import { action, observable } from "mobx";
import FormGeneric from './FormGeneric';

class PhoneStore extends FormGeneric {
  @observable
  form = {
    fields: {
      telephone: {
        value: '',
        error: null,
        rule: 'required|regex:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$/',
        placeholder: 'Phone Number'
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

export default PhoneStore;
