import { observer, Observer } from 'mobx-react';

import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';

interface dataStoreProps extends DrizzleProps {
  navigation: { navigate: any };
}

@observer
@Drizzle
export class TasksScreen extends React.Component<dataStoreProps> {

  componentDidMount() {
    const { pointX } = this.props;
    pointX.fetchTasksCount();
    pointX.fetchAllTasks();
  }

  public render() {
    const { pointX } = this.props;
    return (
      <FlatList
        data={pointX.tasksList}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={this._loadMore}
      />
    );
  }

  private _keyExtractor = (_: any, index: any) => `${index}`;

  private _loadMore = () => {
    const { pointX } = this.props;
    pointX.fetchTasksCount();
    pointX.fetchAllTasks();
  };

  private _renderRow = (data: { item: any; }) => {
    if (data && data.item) {
      const task = data.item;
      const [
        caption,
        description,
        image,
        value,
        owner,
      ] = task;

      const { navigation, theme: { color, style } } = this.props;
      return (
        <Observer>
          {() => (
            <TouchableOpacity onPress={() => navigation.navigate('TaskItemScreen', { task })}>
              <View style={styles.containerRow}>
                <Avatar
                  rounded
                  source={{ uri: image }}
                  size="medium"
                />
                <View style={styles.containerRowMiddle}>
                  <Text style={[style.companyName, color.title]}>{caption}</Text>
                  <Text style={[style.caption2, color.gray3]}>{description}</Text>
                </View>
                <View style={styles.containerRowRight}>
                  <Text style={[style.companyName, color.title]}>{value}</Text>
                  <Text style={[style.caption2, color.gray3]}>{owner.substr(0, 7)}</Text>
                  <Text style={[style.caption2, color.gray3]}>0 days left</Text>
                </View>
              </View>
              <View style={styles.bottomDeriver} />
            </TouchableOpacity>
          )}
        </Observer>
      )
    }
    else {
      return undefined;
    }
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
