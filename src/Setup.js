import React, {Component} from 'react';
import {Notifications, SQLite} from 'expo';
import {join, isEmpty, replace, map, trim} from 'lodash';

import {Platform, StatusBar, SafeAreaView, ActivityIndicator, ImageBackground, Text} from 'react-native';

import MainNavigator from './Navigator';
import locations from '../data/locations.json';

const db = SQLite.openDatabase('bkapp.db');


class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        };
    }

    componentWillMount() {
        let query = "CREATE TABLE IF NOT EXISTS centers (id int primary key not null, name text not null, addr1 text not null, addr2 text, addr3 text, district_id int not null, district text not null, city text not null, state_id int not null, state text not null, pincode int, email text, contact text, mobile text, glat text, glong text, zone text, subzone text);";

        db.transaction(tx => {
            tx.executeSql('DROP TABLE IF EXISTS centers;');
            tx.executeSql(query, null, this._onCreateSuccess, (tx, err) => console.log('error creating table: ', err));
        }, err => console.log('error creating transaction ', err));
    }

    _onCreateSuccess = async () => {
        console.log('table created successfully');

        let centers = map(locations.data, (c, i) => {
            let addr1 = c.address.line1;
            let addr2 = c.address.line2;
            let addr3 = c.address.line3;

            // addr1 = isEmpty(addr1) ? '' : trim(replace(addr1, /["']/gi, ''));
            // addr2 = isEmpty(addr2) ? '' : trim(replace(addr2, /["']/gi, ''));
            // addr3 = isEmpty(addr3) ? '' : trim(replace(addr3, /["']/gi, ''));
            
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
        }, err => console.log('error insert: ', err), () => this.setState({isReady: true}));
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
            <SafeAreaView style={{flex: 1, backgroundColor: '#e8ded3' }}>
                <StatusBar barStyle="light-content" backgroundColor="#706993" />
                {this.state.isReady ? <MainNavigator /> : loadingInfo}
            </SafeAreaView>
        );
    }
}


export default Setup;
