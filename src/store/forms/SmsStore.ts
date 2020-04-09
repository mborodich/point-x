import { observable, action, computed } from "mobx";
import FormGeneric from './FormGeneric';

class SmsStore extends FormGeneric {
  private timer: NodeJS.Timeout | null;
  constructor() {
    super();
    this.timer = null;
  }

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
  @observable cto = 60;
  @observable canResend = false;

  @computed get formattedResult() {
    return `00:${this.cto < 10 ? '0' + this.cto : this.cto}`;
  }

  @action.bound stopCountdown() {
    if (this.timer) clearInterval(this.timer);
  }

  @action.bound startCountdown() {
    this.timer = setInterval(() => {
      if (this.cto <= 0 && this.timer) {
        clearInterval(this.timer);
        this.cto = 0;
        this.canResend = true;
      }
      this.cto = --this.cto;
    }, 1000);
  }

  @action.bound async onSubmit() {
    // async stuff
  }
}

export default SmsStore;
