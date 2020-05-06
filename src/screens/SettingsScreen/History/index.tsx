import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, TextProps } from 'react-native-elements';
import { observer } from 'mobx-react';
import { Drizzle, DrizzleProps } from "@app/shared/Drizzle";
import { HistoryItem as THistoryItem } from '@app/shared/types';
import { HistoryItem, HistoryList } from '@app/components';

interface HistoryScreenProps extends DrizzleProps {
  navigation: { navigate: any; goBack: any; };
}


const HEADER : TextProps = {
  // @ts-ignore
  text: 'History',
  style: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal'
  }
};

@observer
@Drizzle
export class HistoryScreen extends React.PureComponent<HistoryScreenProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'chevron-left', type: 'material', onPress: this.props.navigation.goBack }}
          centerComponent={HEADER}
          backgroundColor="#F8F8F8"
        />
        <HistoryList
          history={this.props.pointX && this.props.pointX.userHistory}
          count={this.props.pointX && this.props.pointX.historyCount}
          onClick={() => {}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  }
});
