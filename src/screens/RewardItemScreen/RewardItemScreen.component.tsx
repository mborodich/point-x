import React from 'react';
import { Card, Text, Button } from 'react-native-elements';

interface Props {
}

export class RewardItemScreen extends React.Component<Props> {
  public render() {
    return (
      <Card title="Reward info" image={{ uri: `https://picsum.photos/200/200?random=1${Math.random()}` }}>
        <Text>Reward description</Text>
        <Text>Reward description</Text>
        <Text>Reward description</Text>
        <Text>Reward description</Text>
        <Button
          style={{ marginTop: 20 }}
          title="Receive"
        />
      </Card>
    );
  }
}
