import dayjs from 'dayjs';
// @ts-ignore
import bip39 from 'react-native-bip39';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import hdKey from "ethereumjs-wallet/hdkey";

dayjs.extend(relativeTimePlugin);

const timeToX = (v: number | Date | string) => dayjs().to(v);


const getCredentialsFromMnemonic = async (mnemonics: string) : Promise<any> => {
  if (bip39.validateMnemonic(mnemonics)) {
    const seed = await bip39.mnemonicToSeed(mnemonics);
    const hdwallet = hdKey.fromMasterSeed(seed);
    const path = "m/44'/60'/0'/0/0";
    const wallet = hdwallet.derivePath(path).getWallet();
    const address = `0x${wallet.getAddress().toString('hex')}`;
    const privKey = wallet.getPrivateKeyString();
    const pubKey = wallet.getPublicKeyString();
    return {
      address,
      privKey,
      pubKey
    }
  } else return undefined;
};

const calcRest = (rest: number, total: number) : number =>
  Math.round((rest / total) * 100);

const isEmpty = (obj: object) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

const request = async ({ endpoint, opts, payload }: {endpoint: string; payload?:any; opts?: object;}) : Promise<any> => {
  console.log(endpoint, opts, payload);
  const serverUrl = process.env.SERVER_URL || 'http://localhost:8000';
  const response = await fetch(`${serverUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(payload),
    ...opts
  });
  return {
    data: response.json(),
    status: response.status
  };
};

export {
  calcRest,
  isEmpty,
  timeToX,
  request,
  getCredentialsFromMnemonic
}
