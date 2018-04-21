import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Constants, Notifications, SQLite} from 'expo';
import {isEmpty, replace, map, trim} from 'lodash';

import {StatusBar, SafeAreaView, ActivityIndicator, ImageBackground, NetInfo} from 'react-native';

import {firebaseApp} from './config';
import {getUserLocation, getTime} from './helpers/misc';
import registerForPN from './helpers/registerForPN';
import MainNavigator from './Navigator';

import {connectionState, setAuthUser} from './actions/app';
import {setDateDB} from './actions/search';
import locations from '../assets/data/locations.json';

const db = SQLite.openDatabase('bkapp.db');


class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        };
    }

    componentWillMount() {
        let timestamp = this.props.updatedAt;
        let lastUpdatedDate = new Date(timestamp);
        let diff = getTime(lastUpdatedDate, new Date());

        if (timestamp === 0 || diff >= 7) {
            let query = "CREATE TABLE IF NOT EXISTS centers (id int primary key not null, name text not null, addr1 text not null, addr2 text, addr3 text, district_id int not null, district text not null, city text not null, state_id int not null, state text not null, pincode int, email text, contact text, mobile text, glat text, glong text, zone text, subzone text);";

            db.transaction(tx => {
                tx.executeSql('DROP TABLE IF EXISTS centers;');
                tx.executeSql(query, null, this._onCreateSuccess, (tx, err) => console.log('error creating table: ', err));
            }, err => console.log('error creating transaction ', err));
        } else {
            console.log('DB already updated on: ', lastUpdatedDate.toString());

            this.setState({ isReady: true });
        }
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange', this._handleConnectionChange);
        Notifications.addListener(this._handleNotification);

        NetInfo.isConnected.fetch().then(isConnected => {
            return isConnected ? this._registerDeviceForPN() : false;
        }).catch((err) => { });
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this._handleConnectionChange);
        Notifications.removeListener(this._handleNotification);
    }

    _handleConnectionChange = (connectionInfo) => {
        console.log('connection change: ', connectionInfo);
        this.props.connectionState(connectionInfo);
    }

    _handleNotification = (notification) => {
        console.log('got notification: ', notification);
    }

    _registerDeviceForPN = async () => {
        let email = `${Constants.deviceId}@bkapp.com`;
        let password = 'karankaravanharkarrahehai108';

        firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(() => {
            console.log('User creation success');
            return firebaseApp.auth().signInWithEmailAndPassword(email, password).then(() => {
                console.log('User signed in successfully');
                return this._onLoginSucess();
            }).catch((err) => { console.log('Authentication failed', err); })
        }).catch((err) => {
            console.log('User creation failed, checking for email already in use', err);
            if (err.code === 'auth/email-already-in-use') {
                firebaseApp.auth().signInWithEmailAndPassword(email, password).then(() => {
                    console.log('User again signed in successfully');
                    return this._onLoginSucess();
                }).catch((err) => { console.log('Authentication failed again', err); })
            }
        });
    }

    _onLoginSucess = () => {
        let userId = firebaseApp.auth().currentUser.uid;

        registerForPN(userId);
        getUserLocation(userId);

        return this.props.setAuthUser(userId);
    }

    _onCreateSuccess = async () => {
        console.log('table created successfully');

        let centers = map(locations.data, (c, i) => {
            let addr1 = c.address.line1;
            let addr2 = c.address.line2;
            let addr3 = c.address.line3;

            addr1 = isEmpty(addr1) ? '' : trim(replace(addr1, /["']/gi, ''));
            addr2 = isEmpty(addr2) ? '' : trim(replace(addr2, /["']/gi, ''));
            addr3 = isEmpty(addr3) ? '' : trim(replace(addr3, /["']/gi, ''));

            c.name = trim(c.name);
            c.address.city = trim(c.address.city);
            c.contact = isEmpty(c.contact) ? '' : trim(replace(c.contact, /-/gi, ''));

            return `(${i+1}, "${c.name}", "${addr1}", "${addr2}", "${addr3}", ${parseInt(c.district_id) || 0}, "${c.district}", "${c.address.city}", ${parseInt(c.state_id) || 0}, "${c.state}", ${parseInt(c.address.pincode) || 0}, "${c.email}", "${c.contact}", "${c.mobile}", "${c.coords[0]}", "${c.coords[1]}", "${c.zone}", "${c.subZone}")`;
        });

        db.transaction(tx => {
            for(let i in centers) {
                let query = `INSERT INTO centers VALUES ${centers[i]};`;
                tx.executeSql(query);
            }
        }, err => console.log('error insert: ', err), () => this._onInsertSuccess());
    }

    _onInsertSuccess = () => {
        console.log('rows instered successfully');

        this.props.setDateDB();
        this.setState({ isReady: true });
    }

    render() {
        let loadingInfo = (
            <ImageBackground
                imageStyle={{resizeMode: 'cover'}}
                style={{flex: 1, justifyContent: 'center'}}
                source={require('../assets/images/splash.png')}>
                <ActivityIndicator size="large" color="#5C5679" />
            </ImageBackground>
        );

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#eb9e88'}}>
                <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.20)" />
                {this.state.isReady ? <MainNavigator /> : loadingInfo}
            </SafeAreaView>
        );
    }
}


const mapStateToProps = state => ({
    updatedAt: state.search.updatedAt
});

function bindAction(dispatch) {
    return {
        connectionState: connectionInfo => dispatch(connectionState(connectionInfo)),
        setAuthUser: user => dispatch(setAuthUser(user)),
        setDateDB: () => dispatch(setDateDB())
    };
}

export default connect(mapStateToProps, bindAction)(Setup);
