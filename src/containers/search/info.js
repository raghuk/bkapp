import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import {isEmpty} from 'lodash';

import {View, Text, Share, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

import styles from './styles';

// const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


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

    render() {
        let branch = this.state.branch;
        let address = isEmpty(branch.email) ? `${branch.address}\n\n${branch.contact}` : `${branch.address}\n\n${branch.email}\n${branch.contact}`;

        let {latitude, longitude} = branch.coords;
        let marker = {latitude: latitude, longitude: longitude};

        return (
            <View style={styles.content}>
                <MapView
                    style={{alignSelf: 'stretch', height: deviceHeight / 2.2}}
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
            </View>
        );
    }
}


export default connect(null, null)(SearchInfo);
