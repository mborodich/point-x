import React from 'react';
import {Text, View, StyleSheet} from "react-native";

const Note = () => {
  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteCaption}>
        Note:
      </Text>
      <Text style={styles.noteContent}>
        To fully use the application, you need to pass KYC/AML verification.
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  noteContainer: {
    marginTop: 16
  },
  noteCaption: {
    color: '#2F80ED',
  },
  noteContent: {
    marginTop: 15,
    color: 'rgba(255, 255, 255, 0.5);'
  }
});

export default Note;
