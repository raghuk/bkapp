import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import {isEmpty, split, map} from 'lodash';

import {ScrollView, Text, Share, Linking} from 'react-native';
import {Button} from 'react-native-elements';

import styles from './styles';


class SearchInfo extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <Button
                title=''
                large={true}
                buttonStyle={{backgroundColor: '#706993', padding: 4}}
                icon={{name: 'md-share', type: 'ionicon', color: '#fdfdfd'}}
                onPress={() => navigation.state.params.handleShare()} />
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            branch: this.props.navigation.state.params.branch || {}
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleShare: this._shareContactInfo });
    }

    _shareContactInfo = () => {
        let branch = this.state.branch;

        Share.share({
            title: 'Info',
            message: `${branch.name}\n${branch.address}\n\n${branch.email}\n${branch.contact}`
        }).then(result => console.log(result)).catch(error => console.log(error));
    }

    _callNumber = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can not handle url: ', url);
                return false;
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        let contacts = '';
        let branch = this.state.branch;
        let address = isEmpty(branch.email) ? `${branch.address}` : `${branch.address}\n\n${branch.email}`;

        if (!isEmpty(branch.contact)) {
            contacts = split(branch.contact, ',');
            contacts = map(contacts, (c) => {
                c = c.replace(/[-\s+]/g, '');       // remove all spaces and -
                c = c.replace(/^0+/g, '');          // remove leading zero
                return (<Text onPress={()=> this.callNumber(`tel:+91${c}`)}>{`+91${c}`}</Text>);
            });
        }

        let {latitude, longitude} = branch.coords;
        let marker = {latitude: latitude, longitude: longitude};

        return (
            <ScrollView style={styles.content}>
                <MapView
                    style={styles.mapView}
                    minZoomLevel={3}
                    maxZoomLevel={(latitude === 0) ? 4 : 20}
                    initialRegion={{
                        latitude: latitude || 20.5937,
                        longitude: longitude || 78.9629,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                    { (latitude !== 0) ?
                    <MapView.Marker
                        coordinate={marker}
                        title={branch.name}
                        image={require('../../../assets/images/pin.png')} /> : null
                    }
                </MapView>
                { (latitude === 0) ? <Text style={[styles.desc, {color: '#f44242'}]}>We do not have Google Map information for this location. We will update soon.</Text> : null }
                <Text style={styles.desc}>{`${branch.name}\n${address}\n\n`}</Text>
                <Fragment>{`${contacts}\n\n`}</Fragment>
            </ScrollView>
        );
    }
}


export default connect(null, null)(SearchInfo);
