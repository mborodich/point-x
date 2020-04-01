import * as React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle as Dz, DrizzleState } from 'drizzle';

export interface DrizzleProps {
  drizzle: Dz;
  drizzleState: DrizzleState;
  initialized: boolean;
  contractsCall: any;
  contractsGet: any;
}

function drizzleDecoratorFactory<TProps extends DrizzleProps>(
  WrappedComponent: React.ComponentType<TProps>,
): React.ComponentClass<TProps, keyof DrizzleProps> {
  class WithDrizzle extends React.PureComponent<TProps> {
    public render() {
      return (
        <DrizzleContext.Consumer>
          {(contextProps: any) => {
            const { drizzle, drizzleState, initialized } = contextProps;
            if (!initialized) {
              return false;
            }
            return (
              <WrappedComponent
                drizzle={drizzle}
                contractsCall={drizzle.contracts.PointX.methods}
                contractsGet={drizzleState.contracts.PointX}
                drizzleState={drizzleState}
                initialized={initialized}
                {...this.props}
              />
            );
          }}
        </DrizzleContext.Consumer>
      );
    }
  }

  return WithDrizzle;
}

export const Drizzle = drizzleDecoratorFactory;
