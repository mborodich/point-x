import {Dimensions, Platform} from 'react-native';

const numKeyboardType = Platform.OS === "android" ? "numeric" : "number-pad";
const defaultGradient = [ "#383838", "#131313" ];
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');


const LIST_TYPES = {
  GRID: 'grid',
  LIST: 'list'
};

const PROGRESS_COLORS = {
  default: '#3785F7',
  secondary: '#FF375F'
};

export {
  numKeyboardType,
  defaultGradient,
  deviceHeight,
  deviceWidth,
  LIST_TYPES,
  PROGRESS_COLORS
}
