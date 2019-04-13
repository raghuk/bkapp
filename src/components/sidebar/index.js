import React from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import { View, ScrollView, Image } from 'react-native';

import styles from './styles';

const logoImage = require('../../../assets/images/logo-cover.png');
const coverImage = require('../../../assets/images/drawer-cover.png');

const Sidebar = (props) => (
  <SafeAreaView style={styles.safeView} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View style={styles.view}>
      <Image style={styles.drawerLogo} source={logoImage} />
      <Image style={styles.drawerCover} source={coverImage} />
    </View>

    <ScrollView style={styles.listView}>
      <DrawerItems
        {...props}
        activeTintColor="#b5342b"
        activeBackgroundColor="#ede5dc"
        style={styles.list}
        labelStyle={styles.label}
      />
    </ScrollView>
  </SafeAreaView>
);

export default Sidebar;
