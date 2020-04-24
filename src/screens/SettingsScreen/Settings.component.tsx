import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { Avatar, Header, Text, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import { Drizzle, DrizzleProps } from "@app/shared/Drizzle";
import { SettingsMenuItem } from '@app/components';

interface SettingsScreenProps extends DrizzleProps {
  navigation: { navigate: any; };
}


@observer
@Drizzle
export class SettingsScreen extends React.Component<SettingsScreenProps> {
  @observable signOutModalVisible : boolean = false;

  private onMnemonicsClick = () => {
    return this.props.navigation.navigate("Mnemonics");
  };

  private onHistoryClick = () => {
    return this.props.navigation.navigate("History");
  };

  private onRewardsClick = () => {
    return this.props.navigation.navigate("RewardsHistory");
  };


  public render() {
    const { theme: { colorsMap } } = this.props;

    const mock = `https://picsum.photos/100/100?random=1${Math.random()}`;

    return (
      <ScrollView style={styles.container}>
        <Header
          centerComponent={{ text: 'Username' }}
          backgroundColor="#fff"
        />
        <View style={styles.centeredAvatar}>
          <Avatar
            source={{ uri: mock }}
            rounded
            size="large"
          />
        </View>
        <SettingsMenuItem title="Phone Number" subtitle="+7 999 139 33 05"/>
        <SettingsMenuItem title="PIN-Code" withChevron />
        <SettingsMenuItem onPress={this.onMnemonicsClick} title="Mnemonics" withChevron />
        <SettingsMenuItem title="KYC" rightIcon={{ size: 16, name: "info-outline", type: "material", color: colorsMap.orange }} withChevron />
        <SettingsMenuItem onPress={this.onRewardsClick} title="Rewards" withChevron />
        <SettingsMenuItem onPress={this.onHistoryClick} title="History" withChevron />
        <View style={{ flex: 1, backgroundColor: colorsMap.bg }}>
          <SettingsMenuItem title="FAQ" />
          <SettingsMenuItem title="Privacy Policy" />
          <SettingsMenuItem title="Terms of Use" />
          <SettingsMenuItem title="Contact Support" />
          <TouchableOpacity
            onPress={() => this.signOutModalVisible = true}
            style={{ padding: 18 }}
          >
            <Text style={{ ...styles.title, color: colorsMap.blue1 }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {this._renderSignOutModal()}
      </ScrollView>
    )
  }

  private _renderSignOutModal = () : JSX.Element => {
    const { colorsMap } = this.props.theme;

    const onOkClick = () : void => {
      this.signOutModalVisible = false;
      return this.props.navigation.navigate("AuthScreen");
    };


    return (
      <Modal isVisible={this.signOutModalVisible}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Out?</Text>
            <Text style={styles.warningText}>
              Текст предупреждающий о том, что нужно сохранить мнемонику на сторонние носители иначе при утере, профиль будет недоступен
            </Text>
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                containerStyle={styles.modalButtonContainer}
                buttonStyle={styles.modalButton}
                titleStyle={{ color: colorsMap.blue2 }}
                onPress={() => this.signOutModalVisible = false}
              />
              <Button
                title="OK"
                onPress={onOkClick}
                containerStyle={styles.modalButtonContainer}
                buttonStyle={styles.modalButton}
                titleStyle={{ color: colorsMap.blue2 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: 315,
    height: 238,
    borderRadius: 16
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
    fontSize: 20,
    color: '#333333',
    paddingTop: 16
  },
  warningText: {
    textAlign: 'center',
    fontWeight: 'normal',
    lineHeight: 19,
    fontSize: 16,
    color: '#828282',
    paddingTop: 16
  },
  modalActions: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    marginTop: 50
  },
  modalButton: {
    backgroundColor: '#fff',
    width: 119
  },
  modalButtonContainer: {
    width: 118,
    height: 48
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#4F4F4F',
    fontSize: 14,
    lineHeight: 16,
    height: 22,
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 12,
    lineHeight: 14,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  centeredAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  }
});
