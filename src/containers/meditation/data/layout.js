import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {ParallaxImage} from 'react-native-snap-carousel';

import {layoutStyles as styles} from '../styles';


export default class Layout extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image() {
        const { data: { illustration }, parallax, parallaxProps } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps} />
        ) : (
            <Image source={illustration} style={styles.image} />
        );
    }

    render() {
        const { title, subtitle } = this.props.data;

        const uppercaseTitle = title ? (
            <Text style={styles.title} numberOfLines={1}>
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    { uppercaseTitle }
                    <Text style={styles.subtitle} numberOfLines={4}>{ subtitle }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
