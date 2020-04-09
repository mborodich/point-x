import {Dimensions, Platform} from 'react-native';

const numKeyboardType = Platform.OS === "android" ? "numeric" : "number-pad";
const defaultGradient = [ "#383838", "#131313" ];
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');


export {
  numKeyboardType,
  defaultGradient,
  deviceHeight,
  deviceWidth
}
