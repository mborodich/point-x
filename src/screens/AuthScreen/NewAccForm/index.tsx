import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { observer } from "mobx-react";
import NewAccStore from "../../../store/forms/NewAccStore";

import Input from '../Input.component';
import Button from '../Button.component';

type TProps = {};


const newAccForm = new NewAccStore();

@observer
class NewAccForm extends React.PureComponent<TProps> {
  public render() {
    const { form, onFieldChange } = newAccForm;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.captionText}>
          Create New Account
        </Text>
        <Input
          placeholder={form.fields.nickname.placeholder}
          inputContainerStyle={{ marginTop: 40 }}
          value={form.fields.nickname.value}
          onChangeText={text => onFieldChange('nickname', text)}
          autoFocus={true}
        />
        <Input
          placeholder={form.fields.pin.placeholder}
          inputContainerStyle={{ marginTop: 40 }}
          value={form.fields.pin.value}
          keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
          onChangeText={text => onFieldChange('pin', text)}
        />
        <Button
          title="Next"
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
  }
});


export default NewAccForm;
