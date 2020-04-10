import { computed } from 'mobx';
import { ColorsMap, ColorName, colorsMap } from './colors';
import { TextStylesMap, textStyles } from './text';

export class Theme {
  @computed
  public get black() {
    return this.colorWrapper(colorsMap.black);
  }

  @computed
  public get title() {
    return this.colorWrapper(colorsMap.title);
  }

  @computed
  public get gray1() {
    return this.colorWrapper(colorsMap.gray1);
  }

  @computed
  public get gray2() {
    return this.colorWrapper(colorsMap.gray2);
  }

  @computed
  public get gray3() {
    return this.colorWrapper(colorsMap.gray3);
  }

  @computed
  public get gray4() {
    return this.colorWrapper(colorsMap.gray4);
  }

  @computed
  public get gray5() {
    return this.colorWrapper(colorsMap.gray5);
  }
  @computed
  public get gray6() {
    return this.colorWrapper(colorsMap.gray6);
  }

  private colorWrapper(color: string) {
    return { color }
  }

  private backgroundWrapper(color: string) {
    return { backgroundColor: color }
  }
}

export default {
  color: new Theme,
  style: textStyles
}
