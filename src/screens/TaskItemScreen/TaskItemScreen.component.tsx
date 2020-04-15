import { observer } from 'mobx-react';
import React from 'react';
import { AirbnbRating, Tile, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';
import { TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { action, observable } from 'mobx';
import CircularProgress from '../../components/CircularProgress/CircularProgress.component'

const LIST = Array.from({ length: 5 }, (_, i) => i);

export enum TaskTypeEnum {
  List = 'list',
  Star = 'star',
}

function randomInt(min: number, max: number) {
  return min + Math.floor((max - min) * Math.random());
}

@Drizzle
@observer
export class TaskItemScreen extends React.Component<DrizzleProps> {
  static navigationOptions = { tabBarVisible: false }
  private _taskType: TaskTypeEnum = randomInt(1, 3) === 1 ? TaskTypeEnum.List : TaskTypeEnum.Star;
  private _totalSteps: number = this._taskType === TaskTypeEnum.List ? 4 : 1;
  @observable private _activeItem: number = 0;
  @observable private _activeStep: number = 0;
  @observable private _selected: number[] = [];
  @observable private _isComplete: boolean = false;
  private tasksCount: any;

  async componentDidMount(): void {
    const { props } = this;
    const { contractsCall, contractsGet, drizzle } = props;

    this.tasksCount = contractsCall.getTasksCount.cacheCall();

  }


  public render() {
    const { theme: { color, style, colorsMap }, contractsGet } = this.props;

    if (this.tasksCount) {
      const tasksCount = contractsGet.getTasksCount[this.tasksCount];
      console.log('tasksCount', tasksCount)
    }


    return (
      <ScrollView>
        <View style={{ marginBottom: 60 }}>
          <View style={styles.container}>
            <Text style={[style.title, color.title]}>
              Сhoose the packaging you like  Lorem ipsum dolor sit amet sed do eiusmod tem  / 85 Symb
            </Text>
            <Text style={[style.caption2, color.gray2, { marginTop: 5 }]}>
              Stdescription. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim  venia / 150 Symbarbucks
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginTop: 30 }}>
                <View style={{ flex: 1, flexDirection: 'row', width: 150, justifyContent: 'space-between' }}>
                  <Text style={[style.caption2, color.title]}>Left 50</Text>
                  <Text style={[style.caption2, color.title]}>Total 100</Text>
                </View>
                <Progress.Bar progress={0.5} width={150} color={colorsMap.accent} />
              </View>
              <View>
                <Text style={[style.title, color.gray1, { textAlign: 'right', marginTop: 12, marginBottom: 9 }]}>Price 25</Text>
                <Text style={[style.companyName, color.gray3, { textAlign: 'right' }]}>2 Days Ago</Text>
              </View>
            </View>

          </View>
          <Tile
            imageSrc={{ uri: `https://picsum.photos/250/200?random=1${Math.random()}` }}
            containerStyle={{ height: 250 }}
          />
          <View style={styles.containerTitle}>
            <Text style={[style.title, color.title, { flex: 1 }]}>
              Lorem ipsum dolor sit amet? Сhoose the packaging you like  Lorem ipsum dolor sit amet sed do eiusmod temp ?
            </Text>
            <CircularProgress activeStep={this._activeStep} totalSteps={this._totalSteps} isComplete={this._isComplete} />
          </View>
          {!this._isComplete ? this._renderItems() : (
            <View style={styles.containerTitle}><Text>Done</Text></View>
          )}
        </View>

        <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
          {!this._isComplete && this._activeStep > 0 && (
            <TouchableOpacity onPress={this._back}>
              <Text style={[style.companyName, color.gray2, { margin: 20 }]}>
                {'← back'}
              </Text>
            </TouchableOpacity>
          )}

          {!this._isComplete && (
            <TouchableOpacity onPress={this._selectAnswer}>
              <View style={[styles.button, color.accentBg, { ...!this._activeItem ? { opacity: 0.2 } : undefined }]}>
                <Text style={[style.companyName, color.white]}>
                  {this._totalSteps === this._activeStep ? 'Publish' : 'Next'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }


  private _renderItems = () => {
    if (this._taskType === TaskTypeEnum.List) {
      const offset = (this._activeStep + 1) * 5 - 5;
      return LIST.map((_, i) => (
        this.taskQuestionItem(i + 1 + offset)
      ))
    } else {
      return this.taskRate();
    }
  };

  private taskRate() {
    const { theme: { color, style, colorsMap } } = this.props;
    return (
      <AirbnbRating
        size={40}
        showRating={false}
        onFinishRating={(id) => {
          console.log('id', id)
          this._activeItem = id
        }}
        selectedColor={colorsMap.accent}
        starContainerStyle={{
          alignSelf: "flex-start",
          margin: 20,
        }}
      />
    );
  }


  private taskQuestionItem(id: number) {
    const { theme: { color, style } } = this.props;
    const isActive = this._activeItem === id;
    return (
      <TouchableOpacity onPress={() => this._setActive(id)}>
        <View style={[styles.taskQuestion, { ...isActive ? color.gray4bg : undefined }]}>
          <Text style={[style.companyName, { ...isActive ? color.white : color.gray2 }]}>
            {id}: Lorem ipsum dolor sit amet
        </Text>
        </View>
      </TouchableOpacity >
    );
  }

  @action.bound
  private _selectAnswer() {
    if (this._activeItem) {
      this._selected.push(this._activeItem)
      this._activeItem = 0;
      if (this._totalSteps === this._activeStep + 1) {
        this._isComplete = true;
      }
      this._activeStep++;
    }
  }

  @action.bound
  private _setActive(id: number) {
    this._activeItem = id
  }

  @action.bound
  private _back() {
    this._activeItem = 0;
    this._activeStep--;
    this._selected.pop();
  }
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  containerTitle: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingBottom: 15
  },
  taskQuestion: {
    marginHorizontal: 17,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 40,
    width: 160,
    alignItems: 'center'
  }
});
