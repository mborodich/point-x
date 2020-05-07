import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Observer} from 'mobx-react';

import {Avatar, Text} from "react-native-elements";
import { Task } from "@app/shared/types";

type TProps = {
  task: Task;
  theme: { color: any; style: any; };
  onClick: () => void;
  onPartnerClick: any;
};

export const TaskListItem = ({ task, theme, onClick, onPartnerClick } : TProps) : JSX.Element => {
  const { style, color } = theme;
  return (
    <Observer>
      {() => (
        <TouchableOpacity onPress={onClick}>
          <View style={styles.containerRow}>
            <Avatar
              rounded
              source={{ uri: task.image }}
              size="medium"
            />
            <View style={styles.containerRowMiddle}>
              <Text style={[style.companyName, color.title]}>{task.caption}</Text>
              <Text style={[style.caption2, color.gray3]}>{task.description && task.description.substr(0, 65)}...</Text>
            </View>
            <View style={styles.containerRowRight}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[style.companyName, color.title]}>{task.value}</Text>
                {task && task.completed ? <Text style={{ fontSize: 6, color: '#65C366' }}>completed</Text> : null}
              </View>
              <TouchableOpacity onPress={() => onPartnerClick(task && task.partner)}>
                <Text style={[style.caption2, color.gray1]}>{task && task.partner && task.partner.name}</Text>
              </TouchableOpacity>
              <Text style={[style.caption2, color.gray3]}>{task.expirationDate || '0 days left'}</Text>
            </View>
          </View>
          <View style={styles.bottomDeriver} />
        </TouchableOpacity>
      )}
    </Observer>
  )
};


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
    alignItems: 'flex-end',
  },
  bottomDeriver: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    paddingHorizontal: 16,
    marginHorizontal: 16
  }
});
