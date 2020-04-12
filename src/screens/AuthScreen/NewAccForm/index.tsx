import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { observer, inject } from "mobx-react";

import {numKeyboardType} from "@app/utils/const";
import {NewAccStore} from '@app/store/'
import {Input, Button} from '@app/components/';

type TProps = {
  newAccForm: NewAccStore;
  navigation: { navigate: any; };
};

const behavior = Platform.OS === "ios" ? "padding" : "height";

@inject('newAccForm')
@observer
class NewAccForm extends React.PureComponent<TProps> {
  go = () => this.props.navigation.navigate({ name : 'Application' });

  public render() {
    const { form, onFieldChange } = this.props.newAccForm;

    return (
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.container}
      >
        <Text style={styles.captionText}>
          Create New Account
        </Text>
        <Input
          placeholder={form.fields.nickname.placeholder}
          inputContainerStyle={styles.marginTop_}
          value={form.fields.nickname.value}
          onChangeText={text => onFieldChange('nickname', text)}
          autoFocus={true}
        />
        <Input
          placeholder={form.fields.pin.placeholder}
          inputContainerStyle={styles.marginTop_}
          value={form.fields.pin.value}
          keyboardType={numKeyboardType}
          onChangeText={text => onFieldChange('pin', text)}
        />
        <Button
          title="Next"
          style={styles.marginTop_}
          disabled={!form.meta.isValid}
          onPress={this.go}
        />
      </KeyboardAvoidingView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 200
  },
  captionText: {
    fontSize: 24,
    lineHeight: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  contentContainer: {
    marginBottom: 25
  },
  marginTop_ : {
    marginTop: 40
  }
});


export default NewAccForm;
