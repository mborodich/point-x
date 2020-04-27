import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { observer, inject } from "mobx-react";

import {Input, Button} from '@app/components/';
import {mnemonicToCredentials} from '@app/utils';
import {LoginStore, UserStore} from '@app/store/';

type TProps = {
  loginForm: LoginStore;
  userStore: UserStore;
  navigation: { navigate: any };
};

const behavior = Platform.OS === "ios" ? "position" : "height";

@inject('loginForm', 'userStore')
@observer
class LoginForm extends React.PureComponent<TProps> {
  onSubmit = async () : Promise<void> => {
    const { loginForm, userStore } = this.props;
    if (loginForm.form.fields.mnemonics.value) {
      const credentials = await mnemonicToCredentials(loginForm.form.fields.mnemonics.value);
      userStore.onUserCredentialsObtained(credentials);
      this.props.navigation.navigate({ name: 'Application' });
    }
  };

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
          onPress={this.onSubmit}
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
