import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SQLite } from 'expo';
import { isEmpty, isObject, find, split, concat, uniq } from 'lodash';

import { View, ScrollView, Picker, Alert, ImageBackground, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');

const db = SQLite.openDatabase('bkapp.db');


class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      states: [],
      cities: [],
      selectedState: 0,
      selectedCity: '',
      keywordValue: ''
    };
  }

  componentWillMount() {
    const query = 'SELECT state_id as id, state, GROUP_CONCAT(DISTINCT city) as cities FROM centers GROUP BY state_id, state ORDER BY state ASC;';

    db.transaction(
      (tx) => {
        tx.executeSql(query, null, this.onSelectSuccess, (tx, err) => console.log('error select request: ', err));
      },
      (err) => console.log('error getting locations list transaction ', err)
    );
  }

  onSelectSuccess = async (tx, results) => {
    // eslint-disable-next-line no-underscore-dangle
    const states = concat([{ id: 0, state: '', cities: [] }], results.rows._array);

    this.setState({ isReady: true, states });
  };

  stateSelected = (itemValue) => {
    const { states } = this.state;

    const obj = find(states, ['id', itemValue]);
    const cities = isObject(obj) ? uniq(concat([''], split(obj.cities, ','))) : [];

    this.setState({ selectedState: obj.id, selectedCity: '', cities: cities.sort() });
  };

  citySelected = (itemValue, itemIndex) => {
    if (itemIndex === 0) {
      this.setState({ selectedCity: itemValue });
    } else {
      this.setState({ selectedCity: itemValue, keywordValue: '' });
    }
  };

  handleSearch = () => {
    let validationError = false;
    const { selectedState, selectedCity, keywordValue } = this.state;

    if (selectedState === 0) {
      validationError = true;
      Alert.alert('Error - Required Fields', 'Please select State and then select City or enter Keyword.');
    } else if (selectedState !== 0 && (isEmpty(selectedCity) && isEmpty(keywordValue))) {
      validationError = true;
      Alert.alert('Error - Required Fields', 'Please select City or enter any Keyword.');
    }

    if (!validationError) {
      const params = { state_id: selectedState, city_name: selectedCity, keyword: keywordValue };
      this.props.navigation.navigate('SearchList', params);
    }
  };

  render() {
    const { isReady, states, cities, selectedState, selectedCity } = this.state;

    if (!isReady) {
      return (
        <View style={styles.content}>
          <ImageBackground imageStyle={{ resizeMode: 'cover' }} style={styles.loader} source={loaderImage}>
            <ActivityIndicator size="large" color="#5C5679" />
          </ImageBackground>
        </View>
      );
    }

    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <ScrollView style={styles.searchView}>
          <Text style={styles.title}>You can search branch by selecting</Text>
          <Text style={styles.title}>State & City</Text>

          <View style={styles.pickerView}>
            <Text style={styles.label}>Select State:</Text>
            <Picker style={styles.picker} selectedValue={selectedState} onValueChange={(itemValue, itemIndex) => this.stateSelected(itemValue, itemIndex)}>
              {states.map((l) => <Picker.Item value={l.id} label={l.state} key={l.id} />)}
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Text style={styles.label}>Select City:</Text>
            <Picker style={styles.picker} selectedValue={selectedCity} onValueChange={(itemValue, itemIndex) => this.citySelected(itemValue, itemIndex)}>
              {cities.map((l) => <Picker.Item value={l} label={l} key={l} />)}
            </Picker>
          </View>
          <View style={[styles.pickerView, { marginBottom: 30 }]} />
          <Button
            raised
            titleStyle={{ fontSize: 18, fontFamily: 'Titillium' }}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            buttonStyle={{ padding: 15, elevation: 2, backgroundColor: '#384756' }}
            title="Find Branch"
            onPress={this.handleSearch}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}


const mapStateToProps = (state) => ({
  updatedAt: state.search.updatedAt
});

export default connect(mapStateToProps, null)(SearchForm);
