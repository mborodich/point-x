import * as React from 'react';
import { DrizzleContext, InjectDrizzleProps } from 'drizzle-react';

function drizzleDecoratorFactory<TProps extends InjectDrizzleProps>(
  WrappedComponent: React.ComponentType<TProps>,
): React.ComponentClass<TProps, keyof InjectDrizzleProps> {
  class WithDrizzle extends React.Component<TProps> {
    public render() {
      return (
        <DrizzleContext.Consumer>
          {(contextProps) => <WrappedComponent {...contextProps} {...this.props} />}
        </DrizzleContext.Consumer>
      );
    }
  }

  return WithDrizzle;
}

export const Drizzle = drizzleDecoratorFactory;
