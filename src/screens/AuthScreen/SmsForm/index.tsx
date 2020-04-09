import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { observer, inject } from 'mobx-react';

import Input from '../Input.component';
import Button from '../Button.component';

import {SmsStore, PhoneStore} from '../../../store/';
import {numKeyboardType} from '../../../utils/const';

type TProps = {
  nextStep: () => void;
  smsForm: SmsStore;
  phoneForm: PhoneStore;
};


const behavior = Platform.OS === "ios" ? "padding" : "height";

@inject('smsForm', 'phoneForm')
@observer
class SmsForm extends React.PureComponent<TProps> {
  fieldChangeReaction(field: string, val: string) : void {
    if (val && val.length === 4) {
      this.props.smsForm.onFieldChange(field, val);
      this.props.nextStep(); // todo: sms processing before
    }
  }

  resendWrapper = async () : Promise<void> => {
    if (this.props.smsForm.canResend) {
      try {
        // async stuff then start lifecycle
      } catch (error) {
        // handle error
      }
    }
  };

  componentDidMount(): void {
    this.props.smsForm.startCountdown();
  }

  componentWillUnmount(): void {
    this.props.smsForm.stopCountdown();
  }

  public render() {
    const { form: {fields: {telephone}} } = this.props.phoneForm;
    const { form: _form, canResend, formattedResult } = this.props.smsForm;
    const title = canResend ? 'Resend' : 'Resend ' + formattedResult;

    return (
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.container}
      >
        <Text style={styles.codeSentText}>
          Code sent to number{'\n'} {telephone.value}
        </Text>
        <Input
          placeholder={_form.fields.sms.placeholder}
          textAlignVertical="center"
          keyboardType={numKeyboardType}
          inputStyle={styles.smsInput}
          inputContainerStyle={styles.smsInputContainer_}
          onChangeText={text => this.fieldChangeReaction('sms', text)}
          autoFocus={true}
        />
        <Button
          title={title}
          disabled={!this.props.smsForm.canResend}
          onPress={this.resendWrapper}
          style={styles.button}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  codeSentText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#ffffff'
  },
  smsInput: {
    textAlign: 'center'
  },
  smsInputContainer_: {
    marginTop: 90
  },
  button: {
    marginTop: 40
  }
});

export default SmsForm;
