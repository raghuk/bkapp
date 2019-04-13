import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SQLite } from 'expo';
import { isEmpty, join, filter, lowerCase, orderBy, toString, toNumber, trim, compact } from 'lodash';

import { View, ScrollView, ActivityIndicator, ImageBackground, FlatList, Text } from 'react-native';
import { Icon, ListItem, SearchBar } from 'react-native-elements';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');

const db = SQLite.openDatabase('bkapp.db');


class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      branches: [],
      searchTerm: '',
      filteredData: []
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    let query = `SELECT * FROM centers WHERE state_id = ${params.state_id} ORDER BY name ASC;`;

    if (!isEmpty(params.city_name)) {
      query = `SELECT * FROM centers WHERE state_id = ${params.state_id} AND city = '${params.city_name}' ORDER BY name ASC;`;
    } else if (!isEmpty(params.keyword)) {
      query = `SELECT * FROM centers WHERE state_id = ${params.state_id} AND (name like '%${params.keyword}%' OR addr1 like '%${params.keyword}%' OR addr2 like '%${
        params.keyword
      }%' OR addr3 like '%${params.keyword}%') ORDER BY name ASC;`;
    }

    db.transaction(
      (tx) => {
        tx.executeSql(query, null, this.onSelectSuccess, (tx, err) => console.log('error searchList request: ', err));
      },
      (err) => console.log('error searchList transaction ', err)
    );
  }

  onSelectSuccess = async (tx, results) => {
    // eslint-disable-next-line no-underscore-dangle
    const addresses = results.rows._array;

    let branches = addresses.map((addr) => {
      let address = join(compact([addr.addr1, addr.addr2, addr.addr3, addr.city]), ', ');
      address = `${address} - ${addr.pincode}. ${addr.state}.`;

      const contact = isEmpty(addr.contact) ? `${addr.mobile}` : isEmpty(addr.mobile) ? `${addr.contact}` : `${addr.contact}, ${addr.mobile}`;

      return {
        id: toString(addr.id),
        name: addr.name,
        address,
        email: addr.email,
        contact,
        coords: { latitude: toNumber(addr.glat), longitude: toNumber(addr.glong) }
      };
    });

    branches = orderBy(branches, 'name', 'asc');
    this.setState({ isReady: true, branches, filteredData: branches });
  };

  filterList = (name) => {
    const { branches } = this.state;
    const term = trim(lowerCase(name));

    if (term.length >= 3) {
      const filteredList = filter(branches, (l) => lowerCase(l.name).search(term) >= 0 || lowerCase(l.address).search(term) >= 0);

      this.setState({ searchTerm: name, filteredData: filteredList });
    } else {
      this.setState({ searchTerm: name, filteredData: branches });
    }
  };

  // eslint-disable-next-line arrow-body-style
  renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.id}
        containerStyle={styles.listItem}
        chevron={<Icon name="ios-arrow-forward" type="ionicon" color="#5c5679" size={22} iconStyle={{ marginLeft: 8 }} />}
        title={item.name}
        titleNumberOfLines={1}
        titleStyle={{ fontSize: 16, fontFamily: 'Titillium', marginLeft: 5 }}
        subtitle={item.address}
        subtitleNumberOfLines={6}
        subtitleStyle={{ fontSize: 14, fontFamily: 'Titillium', fontWeight: 'normal', color: '#5b5b5b', marginLeft: 4 }}
        onPress={() => this.viewBranchInfo(item)}
      />
    );
  };

  viewBranchInfo = (item) => {
    this.props.navigation.navigate('SearchInfo', { branch: item });
  };

  render() {
    const { isReady, searchTerm, filteredData } = this.state;
    const branchList = filteredData;

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
      <View style={styles.listView}>
        <SearchBar
          lightTheme
          round
          searchIcon={<Icon name="ios-search" type="ionicon" color="#5c5679" size={18} />}
          containerStyle={styles.searchContainer}
          inputContainerStyle={{ backgroundColor: '#fdfdfd' }}
          inputStyle={styles.searchInput}
          onChangeText={this.filterList}
          placeholder="Filter below list by branch name/address"
          value={searchTerm}
        />
        <ScrollView style={styles.content}>
          {isEmpty(branchList) ? (
            // eslint-disable-next-line quotes
            <Text style={styles.notice}>{`Sorry, no branches found with your\nsearch/filter keyword.`}</Text>
          ) : (
            <FlatList data={branchList} keyExtractor={(item) => item.id} renderItem={this.renderItem} />
          )}
        </ScrollView>
      </View>
    );
  }
}


export default connect(null, null)(SearchList);
