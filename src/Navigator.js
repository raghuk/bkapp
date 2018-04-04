import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import {Dimensions, View, ImageBackground} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import Sidebar from './components/sidebar';
import {About} from './containers/info';
import {Info, Steps} from './containers/meditation';
import {SearchForm, SearchInfo, SearchList} from './containers/search';


const deviceWidth = Dimensions.get('window').width;

const MeditationTab = StackNavigator({
    Info: {
        screen: Info,
        path: '/',
        navigationOptions: ({ navigation }) => ({
            title: 'Raja Yoga Meditation',
            // headerTransparent: true,
            headerBackground: <ImageBackground imageStyle={{resizeMode: 'cover'}} style={{flex: 1}} source={require('../assets/images/statusbar.png')} />,
            headerTintColor: '#f9f9f9',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: 'transparent', padding: 3}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
            ),
            headerStyle: {
                backgroundColor: 'transparent'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
            }
        })
    },
    Steps: {
        screen: Steps,
        path: '/steps',
        navigationOptions: ({ navigation }) => ({
            title: 'How to Meditate',
            // headerTransparent: true,
            headerBackground: <ImageBackground imageStyle={{resizeMode: 'cover'}} style={{flex: 1}} source={require('../assets/images/statusbar.png')} />,
            headerTintColor: '#f9f9f9',
            headerStyle: {
                backgroundColor: 'transparent'
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

const SearchTab = StackNavigator({
    SearchForm: {
        screen: SearchForm,
        path: '/search',
        navigationOptions: ({ navigation }) => ({
            title: 'Branch Locator',
            // headerTransparent: true,
            headerBackground: <ImageBackground imageStyle={{resizeMode: 'cover'}} style={{flex: 1}} source={require('../assets/images/statusbar.png')} />,
            headerTintColor: '#f9f9f9',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: 'transparent', padding: 3}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
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
        navigationOptions: ({ navigation }) => ({
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
        path: '/search/info',
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

const AboutTab = StackNavigator({
    Contact: {
        screen: About,
        path: '/about',
        navigationOptions: ({ navigation }) => ({
            title: 'About Us',
            // headerTransparent: true,
            headerBackground: <ImageBackground imageStyle={{resizeMode: 'cover'}} style={{flex: 1}} source={require('../assets/images/statusbar.png')} />,
            headerTintColor: '#f9f9f9',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: 'transparent', padding: 3}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
            ),
            headerStyle: {
                backgroundColor: 'transparent'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
            }
        })
    }
});


const MainNavigator = DrawerNavigator(
    {
        MeditationTab: {
            screen: MeditationTab,
            path: '/',
            navigationOptions: () => ({
                drawerLabel: 'Meditation',
                drawerIcon: <Icon name='ios-radio-outline' type='ionicon' color='#d72125' size={30} />
            })
        },
        SearchTab: {
            screen: SearchTab,
            path: '/search',
            navigationOptions: () => ({
                drawerLabel: 'Branch Locator',
                drawerIcon: <Icon name='md-search' type='ionicon' color='#d72125' size={28} />
            })
        },
        AboutTab: {
            screen: AboutTab,
            path: '/about',
            navigationOptions: () => ({
                drawerLabel: 'About Us',
                drawerIcon: <Icon name='ios-ribbon-outline' type='ionicon' color='#d72125' size={28} />
            })
        }
    },
    {
        drawerWidth: deviceWidth * 0.82,
        drawerPosition: 'left',
        initialRouteName: 'MeditationTab',
        contentComponent: (props) => <View style={{flex: 1}}><Sidebar {...props} /></View>,
        drawerBackgroundColor: '#fdfdfd'
    }
);

export default MainNavigator;
