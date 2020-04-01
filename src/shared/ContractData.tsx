import React, { Component } from 'react';
import {
  Text,
} from 'react-native-elements';
import { View } from 'react-native';
import { Drizzle, DrizzleProps } from './Drizzle';

interface ContractDataProps extends DrizzleProps {
  methodArgs?: object[];
  contract: string;
  method: string;
  toUtf8?: boolean;
  toAscii?: boolean;
  render?: any;
}


interface ContractDataState {
  dataKey: any;
}

@Drizzle
export class ContractData extends Component<ContractDataProps, ContractDataState> {
  private contracts: any;

  constructor(props: ContractDataProps) {
    super(props);
    const {
      drizzle, methodArgs, contract, method, drizzleState,
    } = props;

    this.contracts = drizzle.contracts;

    console.log('contract', contract, method);
    this.state = {
      dataKey: this.contracts[contract].methods[
        method
      ].cacheCall(),
    };

    console.log('this.state', this.state);
  }

  // Will not fix legacy component
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: ContractDataProps) {
    const { methodArgs, contract, method } = this.props;

    const didContractChange = contract !== nextProps.contract;
    const didMethodChange = method !== nextProps.method;
    const didArgsChange = JSON.stringify(methodArgs) !== JSON.stringify(nextProps.methodArgs);

    if (didContractChange || didMethodChange || didArgsChange) {
      this.setState({
        dataKey: this.contracts[nextProps.contract].methods[
          nextProps.method
        ].cacheCall(...nextProps.methodArgs),
      });
    }
  }

  render() {
    const {
      drizzle, contract, method, toUtf8, toAscii, render, initialized, drizzleState,
    } = this.props;
    const { dataKey } = this.state;


    console.log('this.contracts[contract]', drizzleState.contracts.PointX.getTasksCount[dataKey].value);
    // // Contract is not yet intialized.
    if (!initialized) {
      return <Text>Initializing...</Text>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (!(dataKey in this.contracts[contract][method])) {
      return <Text>Fetching...</Text>;
    }

    let displayData = this.contracts[contract][method][dataKey].value;

    // Optionally convert to UTF8
    if (toUtf8) {
      displayData = drizzle.web3.utils.hexToUtf8(displayData);
    }

    // Optionally convert to Ascii
    if (toAscii) {
      displayData = drizzle.web3.utils.hexToAscii(displayData);
    }

    // If a render prop is given, have displayData rendered from that component
    if (render) {
      return render(displayData);
    }

    // If return value is an array
    if (Array.isArray(displayData)) {
      const displayListItems = displayData.map((datum, index) => (
        <Text key={index}>
          {`${datum}`}
        </Text>
      ));

      return <View>{displayListItems}</View>;
    }

    // If return value is an object
    if (typeof displayData === 'object') {
      let i = 0;
      const displayObjectProps: [];

      Object.keys(displayData).forEach((key) => {
        if (i != key) {
          displayObjectProps.push(<Text>
            {key}
            {displayData[key]}
          </Text>);
        }

        i++;
      });

      return <View>{displayObjectProps}</View>;
    }

    return (
      <View>
        {`${displayData}`}
      </View>
    );
  }
}
