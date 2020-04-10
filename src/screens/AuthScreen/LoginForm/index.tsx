import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { observer, inject } from "mobx-react";

import Input from '../Input.component';
import Button from '../Button.component';
import {LoginStore} from '../../../store/';

type TProps = {
  loginForm: LoginStore;
  navigation: { navigate: any };
};

const behavior = Platform.OS === "ios" ? "position" : "height";

@inject('loginForm')
@observer
class LoginForm extends React.PureComponent<TProps> {
  go = () => this.props.navigation.navigate({ name: 'Application' });

  public render() {
    const {form, onFieldChange} = this.props.loginForm;
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
          onPress={() => this.go()}
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
