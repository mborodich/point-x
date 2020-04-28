import { observer } from 'mobx-react';
import React from 'react';
import { AirbnbRating, Tile, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '@app/shared/Drizzle';
import { TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { action, observable } from 'mobx';
import CircularProgress from '@app/components/CircularProgress/CircularProgress.component'
import E16 from '@app/utils/E16';

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
  static navigationOptions = { tabBarVisible: false };
  private _taskType: TaskTypeEnum = randomInt(1, 3) === 1 ? TaskTypeEnum.List : TaskTypeEnum.Star;
  private _totalSteps: number = this._taskType === TaskTypeEnum.List ? 4 : 1;
  @observable private _activeItem: number = 0;
  @observable private _activeStep: number = 0;
  @observable private _selected: number[] = [];
  @observable private _isComplete: boolean = false;
  @observable private _taskData: any[] = [];

  async componentDidMount() {
    const { props } = this;
    this._taskData = props.route.params.task;
  }

  public render() {
    const { theme: { color, style, colorsMap } } = this.props;

    let {
      caption,
      description,
      image,
      value,
      itemType,
      totalAmount,
      resultsAmount,
    } = this._taskDetails();

    const { title, rows } = this._decodeTaskDetails();

    return (
      <ScrollView>
        <View style={{ marginBottom: 60 }}>
          <View style={styles.container}>
            <Text style={[style.title, color.title]}>
              {caption}
            </Text>
            <Text style={[style.caption2, color.gray2, { marginTop: 5 }]}>
              {description}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginTop: 30 }}>
                <View style={{ flex: 1, flexDirection: 'row', width: 150, justifyContent: 'space-between' }}>
                  <Text style={[style.caption2, color.title]}>Left {resultsAmount}</Text>
                  <Text style={[style.caption2, color.title]}>Total {totalAmount}</Text>
                </View>
                <Progress.Bar progress={0.0} width={150} color={colorsMap.accent} />
              </View>
              <View>
                <Text style={[style.title, color.gray1, { textAlign: 'right', marginTop: 12, marginBottom: 9 }]}>Price {value}</Text>
                <Text style={[style.companyName, color.gray3, { textAlign: 'right' }]}>2 Days Ago</Text>
              </View>
            </View>

          </View>
          <Tile
            imageSrc={{ uri: image }}
            containerStyle={{ height: 250 }}
          />
          <View style={styles.containerTitle}>
            <Text style={[style.title, color.title, { flex: 1 }]}>
              {title}
            </Text>
            <CircularProgress activeStep={this._activeStep} totalSteps={this._totalSteps} isComplete={this._isComplete} />
          </View>
          {!this._isComplete ? this._renderItems(itemType, rows) : (
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

  private _decodeTaskDetails = () => {
    let { taskData } = this._taskDetails();
    let items: any[] = [];
    let title: string = '';
    let rows: any[] = [];

    if (taskData) {
      items = E16.decoder(taskData);
      this._totalSteps = items.length;
      items = items[this._activeStep];
      if (items) {
        title = items[0]
        rows = items.slice(1);
      }
    }
    return { title, rows }
  }


  private _taskDetails = () => {
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
    ] = this._taskData;
    return {
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
    }
  }

  private _renderItems = (type, rows) => {
    if (type === "0") {
      return rows.map((answer, i) => (
        this.taskQuestionItem(answer, i + 1)
      ))
    } else if (type === "1" || type === "2") {
      return this.taskRate()
    }
  };

  private taskRate() {
    const { theme: { color, style, colorsMap } } = this.props;
    return (
      <AirbnbRating
        size={40}
        showRating={false}
        onFinishRating={(id) => {
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


  private taskQuestionItem(answer: string, id: number) {
    const { theme: { color, style } } = this.props;
    const isActive = this._activeItem === id;
    return (
      <TouchableOpacity onPress={() => this._setActive(id)}>
        <View style={[styles.taskQuestion, { ...isActive ? color.gray4bg : undefined }]}>
          <Text style={[style.companyName, { ...isActive ? color.white : color.gray2 }]}>
            {answer}
          </Text>
        </View>
      </TouchableOpacity >
    );
  }

  @action.bound
  private _selectAnswer() {
    if (this._activeItem) {
      this._selected.push(this._activeItem);
      this._activeItem = 0;
      if (this._totalSteps === this._activeStep + 1) {
        this._isComplete = true;
      }
      this._activeStep++;
    }

    if (this._activeStep === this._totalSteps) {
      const { number : id } = this._taskDetails();
      this.props.pointX.completeTask(id, this._selected);
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
