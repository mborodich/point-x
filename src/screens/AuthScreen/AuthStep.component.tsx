import React from 'react';
import {View} from 'react-native';


export type TProps = {

};

class AuthStep extends React.PureComponent<TProps> {


  public render() {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}



export default AuthStep;
