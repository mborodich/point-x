import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Header, TextProps } from 'react-native-elements';
import { observer } from 'mobx-react';
import { Drizzle, DrizzleProps } from "@app/shared/Drizzle";
import { HistoryItem as THistoryItem } from '@app/shared/types';
import { HistoryItem } from '@app/components';

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
        {
          this.props.pointX.userHistory.map((item : THistoryItem, idx: number) => (
            <HistoryItem
              item={item}
              key={idx}
              onClick={() => {}}
            />
          ))
        }
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
