import { observer } from 'mobx-react';

import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';

interface dataStoreProps extends DrizzleProps {
  navigation: { navigate: any };
}

const LIST = Array.from({ length: 5 }, (_, i) => i);

@observer
@Drizzle
export class TasksScreen extends React.Component<dataStoreProps> {
  constructor(props: Readonly<dataStoreProps>) {
    super(props);
  }

  public render() {
    return (
      <FlatList
        data={LIST}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={this._loadMore}
      />
    );
  }

  private _keyExtractor = (_: any, index: any) => `${index}`;

  private _loadMore = () => {
  };

  private _renderRow = () => {
    const { navigation, theme: { color, style } } = this.props;
    const Item = observer(() => (
      <TouchableOpacity onPress={() => navigation.navigate('TaskItemScreen')}>
        <View style={styles.containerRow}>
          <Avatar
            rounded
            source={{ uri: `https://picsum.photos/100/100?random=1${Math.random()}` }}
            size="medium"
          />
          <View style={styles.containerRowMiddle}>
            <Text style={[style.companyName, color.title]}>Сhoose the packaging you like</Text>
            <Text style={[style.caption2, color.gray3]}>from the proposed options, select</Text>
          </View>
          <View style={styles.containerRowRight}>
            <Text style={[style.companyName, color.title]}>19.0</Text>
            <Text style={[style.caption2, color.gray3]}>Starbucks</Text>
            <Text style={[style.caption2, color.gray3]}>8 days left</Text>
          </View>
        </View>
        <View style={styles.bottomDeriver} />
      </TouchableOpacity>
    ));

    return <Item />;
  };
}


const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
  },
  containerRowMiddle: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10
  },
  containerRowRight: {
    alignItems: 'flex-end'
  },
  bottomDeriver: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  }
});
