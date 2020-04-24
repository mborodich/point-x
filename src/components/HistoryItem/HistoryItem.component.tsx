import React from 'react';
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Partner } from "@app/shared/types";

type HistoryItem = {
  name: string;
  image: string;
  description: string;
  value: number;
  date: string;
};


type TProps = {
  item: HistoryItem;
  key: number | string;
  onClick: () => void;
};


export const HistoryItem = ({ item, onClick, key } : TProps) : JSX.Element => {
  const shortenedDesc = item.description.length > 40 ? item.description.slice(0, 35) + '...': item.description;
  return (
    <ListItem
      key={key}
      leftAvatar={{ source: { uri: item.image } }}
      title={item.name}
      subtitle={shortenedDesc}
      rightTitle={item.value > 0 ? `+${item.value}` : item.value.toString()}
      rightSubtitle={item.date}
      titleStyle={styles.historyItemTitle}
      rightTitleStyle={{ ...styles.historyItemTitle, color: item.value > 0 ? '#219653' : '#828282'}}
      rightSubtitleStyle={styles.historyItemDesc}
      subtitleStyle={styles.historyItemDesc}
      bottomDivider
      onPress={onClick}
    />
  );
};


const styles = StyleSheet.create({
  historyItemTitle: {
    fontSize: 14,
    lineHeight: 17,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  historyItemDesc: {
    fontSize: 12,
    // lineHeight: 14,
    marginTop: 5,
    color: '#828282',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  historyTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: '#4F4F4F',
    textAlign: 'left',
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingLeft: 16,
    paddingTop: 24
  }
});
