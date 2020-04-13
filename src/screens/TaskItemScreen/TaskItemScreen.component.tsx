import React from 'react';
import { Avatar, Tile, Text } from 'react-native-elements';
import { Drizzle, DrizzleProps } from '../../shared/Drizzle';
import { ScrollView, View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const LIST = Array.from({ length: 5 }, (_, i) => i);

@Drizzle
export class TaskItemScreen extends React.Component<DrizzleProps> {
  static navigationOptions = { tabBarVisible: false }


  public render() {
    const { theme: { color, style, colorsMap } } = this.props;
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
            <Avatar
              rounded
              source={{ uri: `https://picsum.photos/100/100?random=1${Math.random()}` }}
              size="medium"
            />
          </View>

          {
            LIST.map(() => (
              this.taskQuestionItem()
            ))
          }
        </View>
        <View style={[styles.button, color.accentBg]}>
          <Text style={[style.companyName, color.white]}>
            Publish
          </Text>
        </View>
      </ScrollView>
    );
  }

  private taskQuestionItem() {
    const { theme: { color, style } } = this.props;

    return (
      <View style={styles.taskQuestion}>
        <Text style={[style.companyName, color.gray2]}>
          Lorem ipsum dolor sit amet
      </Text>
      </View>
    );
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
