import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import {Dimensions, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import Sidebar from './components/sidebar';
import Contact from './containers/contact';
import {SearchForm, SearchInfo, SearchList} from './containers/search';

const deviceWidth = Dimensions.get('window').width;


const SearchTab = StackNavigator({
    SearchForm: {
        screen: SearchForm,
        path: '/',
        navigationOptions: ({ navigation }) => ({
            title: 'Branch Locator',
            headerTintColor: '#f9f9fc',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: '#706993', padding: 4}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
            ),
            headerStyle: {
                backgroundColor: '#706993'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, marginHorizontal: 5
            }
        })
    },
    SearchList: {
        screen: SearchList,
        path: '/search',
        navigationOptions: ({ navigation }) => ({
            title: 'Branches List',
            headerTintColor: '#f9f9fc',
            headerStyle: {
                backgroundColor: '#706993'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, marginHorizontal: 5
            },
            headerBackTitleStyle: {
                color: '#fdfdfd'
            }
        })
    },
    SearchInfo: {
        screen: SearchInfo,
        path: '/search/info',
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.branch.name}`,
            headerTintColor: '#f9f9fc',
            headerStyle: {
                backgroundColor: '#706993'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, marginHorizontal: 5
            },
            headerBackTitleStyle: {
                color: '#fdfdfd'
            }
        })
    }
});

const ContactTab = StackNavigator({
    Contact: {
        screen: Contact,
        path: '/contact',
        navigationOptions: ({ navigation }) => ({
            title: 'Contact Us',
            headerTintColor: '#f9f9fc',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: '#706993', padding: 4}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
            ),
            headerStyle: {
                backgroundColor: '#706993'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, marginHorizontal: 5
            }
        })
    }
});


const MainNavigator = DrawerNavigator(
    {
        SearchTab: {
            screen: SearchTab,
            path: '/',
            navigationOptions: () => ({
                drawerLabel: 'Branch Locator',
                drawerIcon: <Icon name='md-search' type='ionicon' color='#333' />
            })
        },
        ContactTab: {
            screen: ContactTab,
            path: '/contact',
            navigationOptions: () => ({
                drawerLabel: 'Contact Us',
                drawerIcon: <Icon name='md-information-circle' type='ionicon' color='#333' />
            })
        }
    },
    {
        drawerWidth: deviceWidth * 0.82,
        drawerPosition: 'left',
        initialRouteName: 'SearchTab',
        contentComponent: (props) => <View style={{flex: 1}}><Sidebar {...props} /></View>,
        drawerBackgroundColor: '#fdfdfd'
    }
);

export default MainNavigator;
