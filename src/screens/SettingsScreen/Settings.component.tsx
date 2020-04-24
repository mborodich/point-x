import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { Avatar, Header, Text, Divider, Icon, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

interface SettingsScreenProps {
  navigation: { navigate: any; };
}

const mockUser = {
  avatar: `https://picsum.photos/100/100?random=1${Math.random()}`,
  name: 'coolnickname',
  number: '0123 456 789'
};

@observer
export class SettingsScreen extends React.Component<SettingsScreenProps> {

  private onMnemonicsClick = () => {
    return this.props.navigation.navigate("Mnemonics");
  };

  private onHistoryClick = () => {
    return this.props.navigation.navigate("History");
  };

  private onRewardsClick = () => {
    return this.props.navigation.navigate("RewardsHistory");
  };

  private _renderMain () : JSX.Element {
    return (
      <View style={{ marginTop: 24 }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              Phone Number
            </Text>
            <Text style={styles.subtitle}>
              +7 982 648 33 005
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              PIN-Code
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
          <View >
            <Icon type="material" name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onMnemonicsClick} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              Mnemonics
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
          <View >
            <Icon type="material" name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 45, width: 400, padding: 8 }}>
          <View>
            <View style={{ flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.title}>
                KYC
              </Text>
              <Icon name="info-outline" type="material" color="#EC4D3D" size={16} />
            </View>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
          <View >
            <Icon type="material" name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onRewardsClick} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 45, width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              Rewards
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
          <View >
            <Icon type="material" name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onHistoryClick} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 45, width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              History
            </Text>
            <View style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340,
              display: 'none'
            }} />
          </View>
          <View >
            <Icon type="material" name="chevron-right" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private _renderSubmenu() : JSX.Element {
    return (
      <View style={{ backgroundColor: '#f8f8f8', borderTopWidth: 0.5, borderTopColor: '#f3f3f3', height: 500 }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 48, width: 400, padding: 8 }}>
          <View>
            <Text style={{ ...styles.title, marginTop: 15 }}>
              FAQ
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              Privacy Policy
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 45, width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              Terms of Use
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 45,  width: 400, padding: 8 }}>
          <View>
            <Text style={styles.title}>
              Contact Support
            </Text>
            <Divider style={{
              height: 1,
              backgroundColor: '#E0E0E0',
              marginTop: 7,
              width: 340
            }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.signOutModalVisible = true}
          style={{ padding: 8 }}
        >
            <Text style={{ ...styles.title, color: '#3785F7' }}>Sign Out</Text>
        </TouchableOpacity>

      </View>
    );
  }

  @observable signOutModalVisible : boolean = false;

  public render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: mockUser.name }}
          backgroundColor="#fff"
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
          <Avatar
            source={{ uri: `https://picsum.photos/100/100?random=1${Math.random()}` }}
            rounded
            containerStyle={{ width: 64, height: 64 }}
            size="large"
          />
          {this._renderMain()}
          {this._renderSubmenu()}
        </View>
        <Modal isVisible={this.signOutModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
            <View style={{ flexDirection: 'column', backgroundColor: '#fff', width: 315, height: 238, borderRadius: 16 }}>
              <Text style={{ textAlign: 'center', fontWeight: '500', lineHeight: 24, fontSize: 20, color: '#333333', paddingTop: 16 }}>
                Sign Out?
              </Text>

              <Text style={{ textAlign: 'center', fontWeight: 'normal', lineHeight: 19, fontSize: 16, color: '#828282', paddingTop: 16 }}>
                Текст предупреждающий о том, что нужно сохранить мнемонику на сторонние носители иначе при утере, профиль будет недоступен
              </Text>

              <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'center', marginTop: 50 }}>
                <Button
                  title="Cancel"
                  containerStyle={{ width: 118, height: 48, }}
                  buttonStyle={{ backgroundColor: '#fff', width: 119, }}
                  titleStyle={{ color: '#0D57CA' }}
                  onPress={() => this.signOutModalVisible = false}
                />
                <Button
                  title="OK"
                  onPress={() => {
                    this.signOutModalVisible = false;
                    return this.props.navigation.navigate("AuthScreen");
                  }}
                  containerStyle={{ width: 118, height: 48 }}
                  buttonStyle={{ backgroundColor: '#fff', width: 119 }}
                  titleStyle={{ color: '#0D57CA' }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  }
});
