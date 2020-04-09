import {action, observable} from "mobx";
import FormGeneric from './FormGeneric';

class NewAccStore extends FormGeneric {
  @observable
  form = {
    fields: {
      nickname: {
        value: '',
        error: null,
        rule: 'required|string',
        placeholder: 'Nickname'
      },
      pin: {
        value: '',
        error: null,
        rule: 'required|string',
        placeholder: 'PIN number'
      }
    },
    meta: {
      isValid: true,
      error: null
    }
  };

  @action
  async onSubmit() {
    // async stuff
  };
}

export default NewAccStore;
