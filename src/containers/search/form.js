import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SQLite} from 'expo';
import {isEmpty, isObject, find, split, concat, uniq} from 'lodash';

import {View, ScrollView, Picker, TextInput, Alert, ImageBackground, KeyboardAvoidingView} from 'react-native';
import {Button, Text} from 'react-native-elements';

import styles from './styles';

const db = SQLite.openDatabase('bkapp.db');


class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            editable: true,
            states: [],
            cities: [],
            selectedState: 0,
            selectedCity: '',
            keywordValue: ''
        };
    }

    componentWillMount() {
        let query = "SELECT state_id as id, state, GROUP_CONCAT(DISTINCT city) as cities FROM centers GROUP BY state_id, state ORDER BY state ASC;";

        db.transaction(tx => {
            tx.executeSql(query, null, this._onSelectSuccess, (tx, err) => console.log('error select request: ', err));
        }, err => console.log('error getList transaction ', err));
    }

    _onSelectSuccess = async (tx, results) => {
        let states = concat([{"id": 0, "state": "", "cities": []}], results.rows._array);

        this.setState({isReady: true, states: states});
    }

    _stateSelected = (itemValue, itemIndex) => {
        let obj = find(this.state.states, ['id', itemValue]);
        let cities = isObject(obj) ? uniq(concat([''], split(obj.cities, ','))) : [];

        this.setState({selectedState: obj.id, selectedCity: '', cities: cities.sort()});
    }

    _citySelected = (itemValue, itemIndex) => {
        if (itemIndex === 0) {
            this.setState({selectedCity: itemValue, editable: true});
        } else {
            this.setState({selectedCity: itemValue, keywordValue: '', editable: false});
        }
    }

    _handleSearch = () => {
        let validationError = false;
        const { selectedState, selectedCity, keywordValue } = this.state;

        if (selectedState === 0) {
            validationError = true;
            Alert.alert('Error - Required Fields', 'Please select State and then select City or enter Keyword.');
        } else if ((selectedState !== 0) && (isEmpty(selectedCity) && isEmpty(keywordValue))) {
            validationError = true;
            Alert.alert('Error - Required Fields', 'Please select City or enter any Keyword.');
        }

        if (!validationError) {
            let params = { state_id: selectedState, city_name: selectedCity, keyword: keywordValue };
            this.props.navigation.navigate('SearchList', params);
        }
    }

    render() {
        if (!this.state.isReady) {
            return <ImageBackground imageStyle={{resizeMode: 'cover'}} style={{flex: 1}} source={require('../../../assets/images/splash.png')} />
        }

        return (
            <KeyboardAvoidingView style={styles.content} behavior="padding">
                <ScrollView style={styles.searchView}>
                    <Text style={styles.title}>Please select below options:</Text>
                    <View style={styles.pickerView}>
                        <Text style={styles.label}>Select State:</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.selectedState}
                            onValueChange={(itemValue, itemIndex) => this._stateSelected(itemValue, itemIndex)}>
                            {this.state.states.map((l, i) => {
                                return <Picker.Item value={l.id} label={l.state} key={i} />
                            })}
                        </Picker>
                    </View>
                    <View style={styles.pickerView}>
                        <Text style={styles.label}>Select City:</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.selectedCity}
                            onValueChange={(itemValue, itemIndex) => this._citySelected(itemValue, itemIndex)}>
                            {this.state.cities.map((l, i) => {
                                return <Picker.Item value={l} label={l} key={i} />
                            })}
                        </Picker>
                    </View>
                    <View style={styles.pickerView}>
                        <Text style={styles.label}>Enter Keyword:</Text>
                        <TextInput
                            ref={(c) => {this._keywordText = c}}
                            editable={this.state.editable}
                            autoCapitalize='none'
                            maxLength={24}
                            style={{fontSize: 16, backgroundColor: '#f9f9fc', height: 50, padding: 10, marginBottom: 30}}
                            value={this.state.keywordValue}
                            placeholder='Enter keyword to refine search'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({keywordValue: text})} />
                    </View>
                    <Button
                        raised={true}
                        large={true}
                        containerViewStyle={{marginLeft: 0, marginRight: 0, backgroundColor: '#e8ded3'}}
                        buttonStyle={{padding: 15}}
                        backgroundColor='#5c5679'
                        title='Find Branch'
                        onPress={this._handleSearch} />
                    <View style={{ height: 60 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}


export default connect(null, null)(SearchForm);
