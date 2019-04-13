import React from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Dimensions, View, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import Sidebar from '../components/sidebar';

import { About } from '../modules/info';
import SearchTab from './stacks/search';

const barImage = require('../../assets/images/statusbar.png');

const deviceWidth = Dimensions.get('window').width;


const AboutTab = createStackNavigator({
  About: {
    screen: About,
    path: '/about',
    navigationOptions: ({ navigation }) => ({
      title: 'About Us',
      headerBackground: <ImageBackground imageStyle={{ resizeMode: 'cover' }} style={{ flex: 1 }} source={barImage} />,
      headerTintColor: '#f9f9f9',
      headerLeft: (
        <Button
          title=""
          buttonStyle={{ backgroundColor: 'transparent', padding: 4 }}
          icon={{ name: 'ios-menu', type: 'ionicon', color: '#fdfdfd', size: 26, marginLeft: 5 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 22, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      }
    })
  }
});


const MainNavigator = createDrawerNavigator(
  {
    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: () => ({
        drawerLabel: 'Branch Locator',
        drawerIcon: <Icon name="md-search" type="ionicon" color="#d72125" size={28} />
      })
    },
    AboutTab: {
      screen: AboutTab,
      path: '/about',
      navigationOptions: () => ({
        drawerLabel: 'About Us',
        drawerIcon: <Icon name="ios-ribbon" type="ionicon" color="#d72125" size={28} />
      })
    }
  },
  {
    drawerWidth: deviceWidth * 0.82,
    drawerPosition: 'left',
    initialRouteName: 'SearchTab',
    contentComponent: (props) => <View style={{ flex: 1 }}><Sidebar {...props} /></View>,
    drawerBackgroundColor: '#fdfdfd'
  }
);

export default createAppContainer(MainNavigator);
