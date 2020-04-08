
export const colorsMap = {
  black: '#000000',
  white: '#FFFFFF',
  gray1: '#333333',
  gray2: '#4F4F4F',
  gray3: '#828282',
  gray4: '#BDBDBD',
  gray5: '#E0E0E0',
  gray6: '#F2F2F2',
  accent: '#FF375F',
  bg: '#F8F8F8',
};

export type ColorName = keyof typeof colorsMap;
export type ColorsMap = { [colorName in ColorName]: string };
