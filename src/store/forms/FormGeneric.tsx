import { action, toJS } from 'mobx';
import Validator from 'validatorjs';

// @ts-ignore
import en from 'validatorjs/src/lang/en';


Validator.setMessages('en', en);


type Field = {
  value: any;
  error: string | null;
  rule: string
};

export type MobxForm = {
  fields: {
    [key: string]: Field;
  };
  meta: {
    isValid: boolean;
    error: string | null;
  };
};

class FormGeneric {
  public form!: MobxForm;

  getFlattenedValues = (valueKey = 'value') : {[key: string] : any} => {
    let data = {};
    // @ts-ignore
    let form = toJS(this.form).fields;
    Object.keys(form).map(key => {
      data[key] = form[key][valueKey]
    });
    return data
  };

  @action
  onFieldChange = (field : string, value : any) : void => {
      this.form.fields[field].value = value || '';
      const validation = new Validator(
        this.getFlattenedValues('value'),
        this.getFlattenedValues('rule')
      );
      this.form.meta.isValid = validation.passes() || false;
      this.form.fields[field].error = validation.errors.first(field) || null;
  };

  @action
  setError = (errMsg : string) : void => {
    this.form.meta.error = errMsg
  }
}

export default FormGeneric;
