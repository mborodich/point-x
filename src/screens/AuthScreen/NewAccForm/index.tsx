import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import {numKeyboardType} from '@app/utils/const';
import {NewAccStore} from '@app/store/'
import {Input, Button} from '@app/components/';

type TProps = {
  newAccForm: NewAccStore;
  navigation: { navigate: any; };
  nextStep: () => void;
  onNewUserSubmit: (name: string) => Promise<void>;
};

const behavior = Platform.OS === "ios" ? "padding" : "height";

@inject('newAccForm')
@observer
class NewAccForm extends React.PureComponent<TProps> {
  @observable isCreating: boolean = false;

  submitWrapper = async () : Promise<void> => {
    try {
      this.isCreating = true;
      const { form } = this.props.newAccForm;
      await this.props.onNewUserSubmit(form.fields.nickname.value);
      this.isCreating = false;
    } catch (error) {
      // todo: display error in input i
    }
  };

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
          loading={this.isCreating}
          disabled={!form.meta.isValid}
          onPress={this.submitWrapper}
        />
      </KeyboardAvoidingView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 200,
    paddingVertical: 10,
    paddingHorizontal: 32,
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
