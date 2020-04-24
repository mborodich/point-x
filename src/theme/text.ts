import { TextStyle } from 'react-native';

export const textStyles: { [key: string]: TextStyle } = {
  // ✅
  title: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  // ✅
  companyName: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 17,
  },
  // ✅
  caption2: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 14,
  },

  screenHeader: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 28,
  },


};

export type TextStyles = keyof typeof textStyles;
export type TextStylesMap = { [textName in TextStyles]: string };
