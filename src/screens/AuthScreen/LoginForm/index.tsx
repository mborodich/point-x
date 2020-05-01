import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { observer, inject } from "mobx-react";

import {Input, Button} from '@app/components/';
import {LoginStore, UserStore} from '@app/store/';

type TProps = {
  loginForm: LoginStore;
  userStore: UserStore;
  onSubmit: (val: string) => Promise<void>;
};

const behavior = Platform.OS === "ios" ? "position" : "height";

@inject('loginForm')
@observer
class LoginForm extends React.PureComponent<TProps> {

  public render() {
    const { form, onFieldChange } = this.props.loginForm;
    return (
      <KeyboardAvoidingView
        behavior={behavior}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <Input
          placeholder={form.fields.mnemonics.placeholder}
          value={form.fields.mnemonics.value}
          onChangeText={text => onFieldChange('mnemonics', text)}
          multiline
        />
        <Button
          title="Sign In"
          style={styles.button}
          disabled={!form.meta.isValid}
          onPress={() => this.props.onSubmit(form.fields.mnemonics.value)}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  contentContainer: {
    marginBottom: 25
  },
  button: {
    marginTop: 40
  }
});

export default LoginForm;
