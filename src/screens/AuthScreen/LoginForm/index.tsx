import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { observer, inject } from "mobx-react";

import Input from '../Input.component';
import Button from '../Button.component';
import { LoginStore } from '../../../store/';
import { Drizzle, DrizzleProps } from '../../../shared/Drizzle';

interface TProps extends DrizzleProps {
  loginForm: LoginStore;
}

const behavior = Platform.OS === "ios" ? "position" : "height";

@inject('loginForm')
@observer
@Drizzle
class LoginForm extends React.PureComponent<TProps> {

  componentDidMount() {
    const { pointX } = this.props;
    pointX.prefetchAll();
  }

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
  },
  button: {
    marginTop: 40
  }
});

export default LoginForm;
