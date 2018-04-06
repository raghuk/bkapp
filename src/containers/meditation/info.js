import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {Button} from 'react-native-elements';

import {styles} from './styles';


class About extends Component {
    render() {
        return (
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Our Approach</Text>
                <Text style={styles.info}>
                    {`The word yoga means connection. In Raja Yoga Meditation, the soul can experience a connection, or mental link, with the Supreme Soul. The process of establishing this link begins with a journey into one’s inner world to discover one’s true, spiritual identity.
                    \nThe process of going within, experiencing oneself as a spiritual being or soul, which is a luminous, sentient point of energy, and then connecting with the Supreme Source of energy empowers the self in a lasting way.
                    \nThis process of self-empowerment is entirely voluntary and involves no element of suppression or coercion of the mind. It is all about aligning one’s thoughts, feelings, words and actions with the soul’s innate qualities of peace, love, bliss and truth.`}
                </Text>
                <Button
                    raised={true}
                    large={true}
                    fontSize={18}
                    fontFamily='Titillium'
                    containerViewStyle={{marginLeft: 0, marginRight: 0}}
                    buttonStyle={{padding: 15, elevation: 2}}
                    backgroundColor='#384756'
                    rightIcon={{name: 'arrow-right', type: 'feather', color: '#e1767d'}}
                    title='How to Meditate'
                    onPress={() => this.props.navigation.navigate('Steps')} />
                <View style={{ height: 50 }} />
            </ScrollView>
        );
    }
}

export default About;
