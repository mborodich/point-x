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
};

export type TextStyles = keyof typeof textStyles;
export type TextStylesMap = { [textName in TextStyles]: string };
