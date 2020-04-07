import React from 'react';
import {View} from 'react-native';

import AuthStep from './AuthStep.component';

type TProps = {
  children: JSX.Element[],
  initialIndex: number
};

const AuthWizard = (props: TProps) => {
  const [index_, setIndex] = React.useState(0);
  const [prevIdx, setPrevIdx] = React.useState(0);

  const getChildsLen = React.useCallback(() => {
    const children = props && props.children;
    return children && children.length;
  }, [props.children]);

  if (props.initialIndex !== prevIdx) {
    setIndex(props.initialIndex);
    setPrevIdx(props.initialIndex);
  }

  const _nextStep = React.useCallback(() => {
    const len = getChildsLen();
    if (len && index_ !== len - 1) {
      setIndex((prevState) => prevState + 1);
    }
  }, [index_]);

  return (
    <View style={{flex: 1}}>
      {React.Children.map(props.children, (el, index) => {
        if (index === index_) {
          return React.cloneElement(el as JSX.Element, {
            currentIndex: index_,
            nextStep: _nextStep,
            setIndex
          });
        }
        return ;
      })}
    </View>
  );
};

AuthWizard.Step = AuthStep;

export default AuthWizard;
