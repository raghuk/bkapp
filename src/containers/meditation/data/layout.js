import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {layoutStyles as styles} from '../styles';


export default class Layout extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    render() {
        const { title, subtitle, illustration } = this.props.data;

        return (
            <TouchableOpacity activeOpacity={1} style={styles.slideContainer}>
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    <Image source={illustration} style={styles.image} />
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
                    <Text style={styles.subtitle} numberOfLines={4}>{subtitle}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
