import React from 'react';
import {View} from 'react-native';

import AuthStep from './AuthStep.component';

type TProps = {
  children: JSX.Element[],
  initialIndex?: number
};

const AuthWizard = (props: TProps) => {
  const [state, setState] = React.useState({
    index: props.initialIndex || 0
  });

  const getChildsLen = React.useCallback(() => {
    const children = props && props.children;
    return children && children.length;
  }, [props.children]);


  const _nextStep = React.useCallback(() => {
    const len = getChildsLen();
    if (len && state.index !== len - 1) {
      setState((prevState) => ({
        index: prevState.index + 1
      }));
    }
  }, [state.index]);

  return (
    <View style={{flex: 1}}>
      {React.Children.map(props.children, (el, index) => {
        console.log(el, index);
        if (index === state.index) {
          return React.cloneElement(el as JSX.Element, {
            currentIndex: state.index,
            nextStep: _nextStep,
            isLast: state.index === getChildsLen() - 1
          });
        }
        return ;
      })}
    </View>
  );
};

AuthWizard.Step = AuthStep;

export default AuthWizard;
