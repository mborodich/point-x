import { observable } from "mobx";
import FormGeneric from './FormGeneric';

class LoginStore extends FormGeneric {
  @observable
  form = {
    fields: {
      mnemonics: {
        value: '',
        error: null,
        rule: 'required|string',
        placeholder: 'Mnemonics'
      }
    },
    meta: {
      isValid: false,
      error: null
    }
  };
}

export default LoginStore;
