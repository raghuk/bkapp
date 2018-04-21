import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SQLite} from 'expo';
import {isEmpty, join, filter, lowerCase, orderBy, toString, toNumber, trim, compact} from 'lodash';

import {View, ScrollView, ActivityIndicator, FlatList, Text} from 'react-native';
import {Icon, ListItem, SearchBar} from 'react-native-elements';

import styles from './styles';

const db = SQLite.openDatabase('bkapp.db');


class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            branches: [],
            filteredData: []
        };
    }

    componentWillMount() {
        let params = this.props.navigation.state.params;
        let query = `SELECT * FROM centers WHERE state_id = ${params.state_id} ORDER BY name ASC;`;

        if (!isEmpty(params.city_name)) {
            query = `SELECT * FROM centers WHERE state_id = ${params.state_id} AND city = '${params.city_name}' ORDER BY name ASC;`;
        } else if (!isEmpty(params.keyword)) {
            query = `SELECT * FROM centers WHERE state_id = ${params.state_id} AND (name like '%${params.keyword}%' OR addr1 like '%${params.keyword}%' OR addr2 like '%${params.keyword}%' OR addr3 like '%${params.keyword}%') ORDER BY name ASC;`;
        }

        db.transaction(tx => {
            tx.executeSql(query, null, this._onSelectSuccess, (tx, err) => console.log('error searchList request: ', err));
        }, err => console.log('error searchList transaction ', err));
    }

    _onSelectSuccess = async (tx, results) => {
        let addresses = results.rows._array;

        let branches = addresses.map(addr => {
            let address = join(compact([addr.addr1, addr.addr2, addr.addr3, addr.city]), ', ');
            address = `${address} - ${addr.pincode}. ${addr.state}.`;

            let contact = isEmpty(addr.contact) ? `${addr.mobile}` : (isEmpty(addr.mobile) ? `${addr.contact}` : `${addr.contact}, ${addr.mobile}`);

            return {
                "id": toString(addr.id),
                "name": addr.name,
                "address": address,
                "email": addr.email,
                "contact": contact,
                "coords": {latitude: toNumber(addr.glat), longitude: toNumber(addr.glong)}
            }
        });

        branches = orderBy(branches, 'name', 'asc');
        this.setState({isReady: true, branches: branches, filteredData: branches});
    }

    _filterList = (term) => {
        term = trim(lowerCase(term));
        if (term.length >= 3) {
            let filteredList = filter(this.state.branches, function(l) {
                return (lowerCase(l.name).search(term) >= 0) || (lowerCase(l.address).search(term) >= 0);
            });

            this.setState({filteredData: filteredList});
        } else {
            this.setState({filteredData: this.state.branches});
        }
    }

    _renderItem = ({item}) => {
        return (
            <ListItem
                key={item.id}
                containerStyle={styles.listItem}
                fontFamily='Titillium'
                hideChevron={false}
                rightIcon={<Icon name='ios-arrow-forward' type='ionicon' color='#5c5679' size={24} iconStyle={{marginLeft: 10}} />}
                title={item.name}
                titleNumberOfLines={1}
                titleStyle={{fontSize: 18, marginLeft: 5}}
                subtitle={item.address}
                subtitleNumberOfLines={6}
                subtitleStyle={{fontSize: 16, fontWeight: 'normal', color: '#5b5b5b', marginLeft: 5}}
                onPress={() => this._viewBranchInfo(item)} />
        )
    }

    _viewBranchInfo = (item) => {
        this.props.navigation.navigate('SearchInfo', {branch: item});
    }

    render() {
        let branchList = this.state.filteredData;

        if (!this.state.isReady) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#5C5679" />
                </View>
            );
        }

        return (
            <View style={styles.listView}>
                <SearchBar
                    lightTheme={true}
                    round={true}
                    noIcon={false}
                    containerStyle={styles.searchContainer}
                    inputStyle={styles.searchInput}
                    onChangeText={this._filterList}
                    placeholder='Filter below list by branch name/address'
                    ref={(search) => {this.search = search}} />
                <ScrollView style={styles.content}>
                {
                    isEmpty(branchList) ?
                    <Text style={styles.notice}>{`Sorry, no branches found with your\nsearch/filter keyword.`}</Text> :
                    <FlatList
                        data={branchList}
                        keyExtractor={(item, index) => item.id}
                        renderItem={this._renderItem} />
                }
                </ScrollView>
            </View>
        );
    }
}


export default connect(null, null)(SearchList);
