import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { observer, inject } from "mobx-react";

import Input from '../Input.component';
import Button from '../Button.component';
import {LoginStore} from '../../../store/';

type TProps = {
  loginForm: LoginStore;
};

@inject('loginForm')
@observer
class LoginForm extends React.PureComponent<TProps> {
  public render() {
    const {form, onFieldChange} = this.props.loginForm;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
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
          style={{ marginTop: 40 }}
          disabled={!form.meta.isValid}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  contentContainer: {
    marginBottom: 25
  }
});

export default LoginForm;
