/* eslint-disable react/prop-types */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, SafeAreaView, ActivityIndicator, ImageBackground, NetInfo, DeviceEventEmitter } from 'react-native';

import { Constants, Notifications, SQLite } from 'expo';
import { isEmpty, replace, map, trim } from 'lodash';

import { firebaseApp } from './config';
import { getUserLocation, getTime } from './helpers/misc';
import registerForPN from './helpers/registerForPN';
import MainNavigator from './navigation';

import { connectionState, setAuthUser } from '../modules/app/store/actions';
import { setDateDB } from '../modules/search/store/actions';

import locations from '../../assets/data/locations.json';

import styles from './styles';

const db = SQLite.openDatabase('bkapp.db');

const splashImage = require('../../assets/images/splash.png');


class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    const { updatedAt } = this.props;

    const lastUpdatedDate = new Date(updatedAt);
    const diff = getTime(lastUpdatedDate, new Date());

    if (updatedAt === 0 || diff >= 7) {
      const query = 'CREATE TABLE IF NOT EXISTS centers (id int primary key not null, name text not null, addr1 text not null, addr2 text, addr3 text, district_id int not null, district text not null, city text not null, state_id int not null, state text not null, pincode int, email text, contact text, mobile text, glat text, glong text, zone text, subzone text);';

      db.transaction(
        (tx) => {
          tx.executeSql('DROP TABLE IF EXISTS centers;');
          tx.executeSql(query, null, this.onCreateSuccess, (tx, err) => console.log('error creating table: ', err));
        },
        (err) => console.log('error creating transaction: ', err)
      );
    } else {
      console.log('DB already updated on: ', lastUpdatedDate.toString());

      this.setState({ isReady: true });
    }
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
    Notifications.addListener(this.handleNotification);

    NetInfo.isConnected
      .fetch()
      .then((isConnected) => (isConnected ? this.registerDeviceForPN() : false))
      .catch((err) => { console.log('netinfo error: ', err); });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
    Notifications.removeListener(this.handleNotification);
  }

  handleConnectionChange = (connectionInfo) => {
    this.props.connectionState(connectionInfo);
  };

  handleNotification = (notification) => {
    console.log('got notification: ', notification);
  };

  registerDeviceForPN = async () => {
    const email = `${Constants.deviceId}@bkapp.com`;
    const password = 'karankaravanharkarrahehai108';

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User creation success');

        return firebaseApp.auth().signInWithEmailAndPassword(email, password);
      })
      .catch((err) => {
        console.log('User creation failed, checking for email already in use', err);

        if (err.code === 'auth/email-already-in-use') {
          return firebaseApp.auth().signInWithEmailAndPassword(email, password);
        }
        console.log('Can not handle an Unknown error', err);
        throw err;
      })
      .then(() => {
        console.log('User signed in successfully');

        return this.onLoginSucess();
      })
      .catch((err) => {
        console.log('Authentication failed again', err);
      });
  };

  onLoginSucess = () => {
    const userId = firebaseApp.auth().currentUser.uid;

    registerForPN(userId);
    getUserLocation(userId);

    return this.props.setAuthUser(userId);
  };

  onCreateSuccess = async () => {
    console.log('table created successfully');

    const centers = map(locations.data, (c, i) => {
      if (c.country === 'NEPAL') {
        return null;
      }

      let addr1 = c.address.line1;
      let addr2 = c.address.line2;
      let addr3 = c.address.line3;

      addr1 = isEmpty(addr1) ? '' : trim(replace(addr1, /["']/gi, ''));
      addr2 = isEmpty(addr2) ? '' : trim(replace(addr2, /["']/gi, ''));
      addr3 = isEmpty(addr3) ? '' : trim(replace(addr3, /["']/gi, ''));

      c.name = trim(c.name);
      c.address.city = trim(c.address.city);
      c.contact = isEmpty(c.contact) ? '' : trim(replace(c.contact, /-/gi, ''));

      return `(${i + 1}, "${c.name}", "${addr1}", "${addr2}", "${addr3}", ${parseInt(c.district_id) || 0}, "${c.district}", "${c.address.city}", ${parseInt(c.state_id) || 0},
      "${c.state}", ${parseInt(c.address.pincode) || 0}, "${c.email}", "${c.contact}", "${c.mobile}", "${c.coords[0]}", "${c.coords[1]}", "${c.zone}", "${c.subZone}")`;
    });

    db.transaction(
      (tx) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const i in centers) {
          if (centers[i]) {
            const query = `INSERT INTO centers VALUES ${centers[i]};`;
            tx.executeSql(query);
          }
        }
      },
      (err) => console.log('error insert: ', err),
      () => this.onInsertSuccess()
    );
  };

  onInsertSuccess = () => {
    console.log('rows instered successfully');

    this.props.setDateDB();
    this.setState({ isReady: true });
  };

  render() {
    const { isReady } = this.state;

    const loadingInfo = (
      <ImageBackground imageStyle={{ resizeMode: 'cover' }} style={{ flex: 1, justifyContent: 'center' }} source={splashImage}>
        <ActivityIndicator size="large" color="#5C5679" />
      </ImageBackground>
    );

    const AppRouter = (
      <MainNavigator
        uriPrefix="/bkapp"
        onNavigationStateChange={(prevState, currentState) => {
          let route = currentState;
          while (route.routes) {
            route = route.routes[route.index];
          }
          DeviceEventEmitter.emit('routeStateChanged', route);
        }}
      />
    );

    return (
      <SafeAreaView style={styles.droidSafeArea} forceInset={{ top: 'top', horizontal: 'never' }}>
        <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.20)" />
        {isReady ? AppRouter : loadingInfo}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => ({
  updatedAt: state.search.updatedAt
});

const mapDispatchToProps = (dispatch) => ({
  connectionState: (connectionInfo) => dispatch(connectionState(connectionInfo)),
  setAuthUser: (user) => dispatch(setAuthUser(user)),
  setDateDB: () => dispatch(setDateDB())
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
