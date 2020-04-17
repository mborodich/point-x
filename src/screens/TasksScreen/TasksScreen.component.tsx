import { observer, Observer } from 'mobx-react';

import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';
import { PointX } from '../../shared/PointX';
import { observable } from 'mobx';

interface dataStoreProps extends DrizzleProps {
  navigation: { navigate: any };
}

@observer
@Drizzle
export class TasksScreen extends React.Component<dataStoreProps> {
  private tasksList: any[] = [];
  @observable private pointX;

  constructor(props: Readonly<dataStoreProps>) {
    super(props);
  }

  async componentDidMount() {
    const { props } = this;
    const { contractsCall, contractsGet } = props;
    this.pointX = new PointX(contractsCall, contractsGet);

    this.pointX.fetchTasksCount()
    //this.pointX.fetchTaskById(1);

    Array.from({ length: 3 }, (_, i) => {
      this.tasksList[i] = contractsCall.getTask.cacheCall(i + 1);
    });
  }

  public render() {
    const { contractsGet } = this.props;
    let tasks = [];
    if (this.tasksList) {
      tasks = this.tasksList.map((i) => {
        return contractsGet.getTask[i];
      })
    }

    return (
      <FlatList
        data={tasks}
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


  private _renderRow = (data) => {
    if (data && data.item) {
      const task = data.item.value;
      const [
        caption,
        description,
        image,
        value,
        owner,
        status,
        itemType,
        taskData,
        totalAmount,
        resultsAmount,
        number
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
