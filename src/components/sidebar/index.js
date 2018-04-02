import React, {Component} from 'react';
import {DrawerItems} from 'react-navigation';

import {View, ScrollView, Image} from 'react-native';

import styles from './styles';


class Sidebar extends Component {
    render() {
        return (
            <View style={styles.view}>
                <Image square style={styles.drawerImage} source={require('../../../assets/images/logo-cover.png')} />
                <Image style={styles.drawerCover} source={require('../../../assets/images/drawer-cover.png')} />
                <ScrollView>
                    <DrawerItems
                        {...this.props}
                        activeTintColor='#b5342b'
                        activeBackgroundColor='#ede5dc'
                        style={styles.list}
                        labelStyle={styles.label} />
                </ScrollView>
            </View>
        );
    }
}

export default Sidebar;
