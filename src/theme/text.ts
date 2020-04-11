import { TextStyle } from 'react-native';

export const textStyles: { [key: string]: TextStyle } = {
  // ✅
  title: {
    fontFamily: 'Helvetica',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  // ✅
  companyName: {
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 17,
  },
  // ✅
  caption1: {
    fontFamily: 'SF Pro Text',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 14,
  },

  screenHeader: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 28,
  }
};

export type TextStyles = keyof typeof textStyles;
