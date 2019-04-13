import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { isEmpty, isNaN, split, map } from 'lodash';

import { ScrollView, Text, Share, Linking, View } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';

const pinImage = require('../../../../assets/images/pin.png');


class SearchInfo extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        title=""
        large
        buttonStyle={{ backgroundColor: '#706993', padding: 4, marginRight: 5 }}
        icon={{ name: 'md-share', type: 'ionicon', color: '#fdfdfd' }}
        onPress={() => navigation.state.params.handleShare()}
      />
    )
  });

  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      branch: navigation.state.params.branch || {}
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ handleShare: this.shareContactInfo });
  }

  shareContactInfo = () => {
    const { branch } = this.state;

    Share.share({
      title: 'Info',
      message: `${branch.name}\n${branch.address}\n\n${branch.email}\n${branch.contact}`
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  callNumber = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Can not handle url: ', url);
          return false;
        }
        return Linking.openURL(url);
      })
      .catch((err) => console.error('An error occurred', err));
  };

  renderContacts = () => {
    const { branch } = this.state;

    if (!isEmpty(branch.contact)) {
      const contacts = split(branch.contact, ',');

      return (
        <View style={styles.contacts}>
          {map(contacts, (ct) => {
            let c = ct;
            c = c.replace(/[-\s+]/g, ''); // remove all spaces and -
            c = c.replace(/^0+/g, ''); // remove leading zero
            return <Text key={c} style={styles.phone} onPress={() => this.callNumber(`tel:+91${c}`)}>{`+91${c}`}</Text>;
          })}
        </View>
      );
    }

    return null;
  }

  render() {
    const { branch } = this.state;

    const { latitude, longitude } = branch.coords;
    const marker = { latitude, longitude };
    const address = isEmpty(branch.email) ? `${branch.address}` : `${branch.address}\n\n${branch.email}`;
    const coordStatus = !isNaN(latitude);

    return (
      <ScrollView style={styles.content}>
        <MapView
          style={styles.mapView}
          minZoomLevel={3}
          maxZoomLevel={coordStatus ? 20 : 4}
          initialRegion={{
            latitude: coordStatus ? latitude : 20.5937,
            longitude: coordStatus ? longitude : 78.9629,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          loadingEnabled
          loadingIndicatorColor="#706993"
        >
          {coordStatus ? <MapView.Marker coordinate={marker} title={branch.name} image={pinImage} /> : null}
        </MapView>

        {!coordStatus ? <Text style={[styles.info, { color: '#f44242', fontSize: 14 }]}>We do not have Google Map information for this location. We will update soon.</Text> : null}

        <Text style={styles.info}>{`${branch.name}\n${address}`}</Text>

        {this.renderContacts()}
      </ScrollView>
    );
  }
}


export default connect(null, null)(SearchInfo);
