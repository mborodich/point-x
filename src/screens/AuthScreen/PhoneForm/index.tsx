import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { observer, inject } from "mobx-react";

import {Input, Button} from "@app/components"
import {PhoneStore} from "@app/store";
import {numKeyboardType} from "@app/utils/const";


type TProps = {
  onSubmit: () => void | Promise<void>;
  nextStep: () => void;
  phoneForm: PhoneStore;
};

const behavior = Platform.OS === "ios" ? "position" : "height";

@inject('phoneForm')
@observer
class PhoneForm extends React.PureComponent<TProps> {
  wrapperSubmit = async () : Promise<void> => {
    try {
      await this.props.phoneForm.onSubmit();
      this.props.nextStep();
    } catch (error) {
      // handle error
    }
  };

  public render() {
    const { form: _form, onFieldChange } = this.props.phoneForm;
    return (
      <KeyboardAvoidingView
        behavior={behavior}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
          <Input
            placeholder={_form.fields.telephone.placeholder}
            value={_form.fields.telephone.value}
            keyboardType={numKeyboardType}
            onChangeText={text => onFieldChange('telephone', text)}
          />
          <Button
            title="Next"
            style={styles.button}
            onPress={this.wrapperSubmit}
            disabled={!_form.meta.isValid}
          />
      </KeyboardAvoidingView>
    )
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

export default PhoneForm;
