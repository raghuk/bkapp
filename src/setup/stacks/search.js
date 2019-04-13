import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

import { SearchForm, SearchInfo, SearchList } from '../../modules/search';

const barImage = require('../../../assets/images/statusbar.png');


export default createStackNavigator({
  SearchForm: {
    screen: SearchForm,
    path: '/search',
    navigationOptions: ({ navigation }) => ({
      title: 'Branch Locator',
      headerBackground: <ImageBackground imageStyle={{ resizeMode: 'cover' }} style={{ flex: 1 }} source={barImage} />,
      headerTintColor: '#f9f9f9',
      headerLeft: (
        <Button
          title=""
          buttonStyle={{ backgroundColor: 'transparent', padding: 4 }}
          icon={{ name: 'md-menu', type: 'ionicon', color: '#fdfdfd', size: 26, marginLeft: 5 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      }
    })
  },
  SearchList: {
    screen: SearchList,
    path: '/search/list',
    navigationOptions: () => ({
      title: 'Branches List',
      headerTintColor: '#f9f9f9',
      headerStyle: {
        backgroundColor: '#706993'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      },
      headerBackTitleStyle: {
        color: '#fdfdfd'
      }
    })
  },
  SearchInfo: {
    screen: SearchInfo,
    path: '/search/list/info',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.branch.name}`,
      headerTintColor: '#f9f9f9',
      headerStyle: {
        backgroundColor: '#706993'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      },
      headerBackTitleStyle: {
        color: '#fdfdfd'
      }
    })
  }
});
