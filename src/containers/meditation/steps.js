import React, {Component} from 'react';
import {ImageBackground, Text} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import Layout from './data/layout';

import steps from './data/content.json'
import {sliderWidth, itemWidth, styles} from './styles';


class Steps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: steps,
            activeSlide: 0
        };
    }

    _renderItem = ({item, index}) => {
        return <Layout data={item} />;
    }

    get pagination () {
        const { entries, activeSlide } = this.state;

        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{backgroundColor: 'transparent'}}
                dotStyle={{width: 12, height: 12, borderRadius: 6, marginHorizontal: 8, backgroundColor: '#f9f9f9'}}
                inactiveDotStyle={{backgroundColor: '#706993'}}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6} />
        );
    }

    render() {
        return (
            <ImageBackground
                imageStyle={{resizeMode: 'cover'}}
                style={{flex: 1, justifyContent: 'center'}}
                source={require('../../../assets/images/default-bg.png')}>
                <Text style={styles.header}>5 Steps of Meditation</Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    layout={'default'}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) } />
                { this.pagination }
            </ImageBackground>
        );
    }
}

export default Steps;
