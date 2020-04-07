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

@inject('smsForm', 'phoneForm')
@observer
class SmsForm extends React.PureComponent<TProps> {
  private countdown : NodeJS.Timeout | null = null;

  state = {
    timer: 59,
    title: `Resend 00:59`,
    canResend: false
  };

  fieldChangeReaction(field: string, val: string) : void {
    if (val && val.length === 4) {
      this.props.smsForm.onFieldChange(field, val);
      this.props.nextStep(); // todo: sms processing before
    }
  }

  resendWrapper = async () : Promise<void> => {
    if (this.state.canResend) {
      try {
        // async stuff then start lifecycle
        this.startLifecycle();
      } catch (error) {
        // handle error
      }
    }
  };

  decrTimer = () =>
    this.setState(({timer} : {timer: number}) => {
      if (timer === 0 && this.countdown) {
        clearInterval(this.countdown);
        return { timer, title: 'Resend', canResend: true }
      }
      const nextTimer = timer - 1;
      const nextTitle = nextTimer > 9 ?
        `Resend 00:${nextTimer}` : `Resend 00:${'0' + nextTimer}`;
      return {
        title: nextTitle,
        timer: nextTimer
      };
    });

  startLifecycle = () : NodeJS.Timeout =>
    this.countdown = setInterval(() => {
      this.decrTimer();
    }, 1000);

  componentDidMount(): void {
    this.startLifecycle();
  }

  componentWillUnmount(): void {
    if (this.countdown) {
      clearInterval(this.countdown);
    }
  }

  public render() {
    const { form: _form } = this.props.smsForm
      , { title, canResend } = this.state
      , { form: {fields: {telephone}} } = this.props.phoneForm;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.codeSentText}>
          Code sent to number{'\n'} {telephone.value}
        </Text>
        <Input
          placeholder={_form.fields.sms.placeholder}
          textAlignVertical="center"
          keyboardType={numKeyboardType}
          inputStyle={{ textAlign: 'center' }}
          inputContainerStyle={{ marginTop: 90 }}
          onChangeText={text => this.fieldChangeReaction('sms', text)}
          autoFocus={true}
        />
        <Button
          title={title}
          disabled={!canResend}
          onPress={this.resendWrapper}
          style={{ marginTop: 40 }}
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
  }
});

export default SmsForm;
