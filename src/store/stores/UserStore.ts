import { action, observable, computed } from 'mobx';
import { Bip32Decoded } from '@app/shared/types';

export default class UserStore {
  @observable userCredentials : Bip32Decoded = {
    privateKey: '',
    publicKey: '',
    mnemonics: ''
  };

  @action.bound onUserCredentialsObtained({ privateKey, publicKey, mnemonics }: Bip32Decoded) : void {
    Object.assign(this.userCredentials, { privateKey, publicKey, mnemonics });
    console.log(this.userCredentials);
  }
}
