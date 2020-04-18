import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity, ScrollView
} from 'react-native';
import { Avatar, Header, Text, Divider, Icon } from 'react-native-elements';



interface SettingsScreenProps {
  navigation: { navigate: any; };
}

const mockUser = {
  avatar: `https://picsum.photos/100/100?random=1${Math.random()}`,
  name: 'coolnickname',
  number: '0123 456 789'
};


export class SettingsScreen extends React.Component<SettingsScreenProps> {

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
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: 400, padding: 8 }}>
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
                <Text style={styles.title}>
                  KYC
                </Text>
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
      <View style={{ backgroundColor: '#f8f8f8', borderTopWidth: 0.5, borderTopColor: '#f3f3f3' }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 48, width: 400, padding: 8 }}>
              <View style={{ height: 48 }}>
                <Text style={styles.title}>
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
            <TouchableOpacity style={{ padding: 8 }} >
                <Text style={{ ...styles.title, color: '#3785F7' }}>Sign Out</Text>
            </TouchableOpacity>
      </View>
    );
  }

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
    height: 24,
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 12,
    lineHeight: 14,
    fontStyle: 'normal',
    fontWeight: 'normal'
  }
});
