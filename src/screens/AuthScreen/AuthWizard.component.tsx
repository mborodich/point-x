import React from 'react';
import {View} from 'react-native';

import AuthStep from './AuthStep.component';
import {TProps as StepProps} from "./AuthStep.component";

type TProps = {

};

type TState = {
  index: number;
};

class AuthWizard extends React.PureComponent<TProps> {
  static Step = (props : StepProps) : JSX.Element => <AuthStep {...props} />;

  state : TState = {
    index: 0
  };

  getChildsLength() : number {
    const children = this.props && this.props.children as JSX.Element[];
    return children && children.length;
  }

  _nextStep = () : void => {
    const length = this.getChildsLength();
    if (length && this.state.index !== length - 1) {
      this.setState((prevState : TState) => ({
        index: prevState.index + 1
      }));
    }
  };

  public render() {
    return (
      <View>
        {React.Children.map(this.props.children, (el, index) => {
          if (index === this.state.index) {
            return React.cloneElement(el as JSX.Element, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              isLast: this.state.index === this.getChildsLength() - 1
            });
          }
          return ;
        })}
      </View>
    );
  }
}



export default AuthWizard;
