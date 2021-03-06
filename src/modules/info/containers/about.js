import React, { PureComponent } from 'react';
import { ScrollView, Text, Linking } from 'react-native';

import styles from './styles';


class About extends PureComponent {
  handleOpenWithLinking = (link) => {
    Linking.openURL(link);
  };

  render() {
    return (
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Brahma Kumaris</Text>
        <Text style={styles.note} onPress={() => this._handleOpenWithLinking('http://www.brahmakumaris.com')}>www.brahmakumaris.com</Text>
        <Text style={styles.info}>
          {`Prajapita Brahma Kumaris Ishwariya Vishwa Vidyalaya (also called Brahma Kumaris) is an international non-governmental spiritual organisation with its headquarters located at Mount Abu, Rajasthan.
          \nWe are a spiritual institution focused on self-transformation through spiritual education and reflective practices.
          \nWe focus on self-transformation by re-discovering and strengthening human potential. This is done by providing a deep and clear understanding of self, God and human existence.`}
        </Text>
        <Text style={styles.title}>Feedback</Text>
        <Text style={styles.info}>
          Thank you for using the app. We request you to leave us your feedback to help us to improve the app with addtinal features.
          <Text style={styles.note} onPress={() => this._handleOpenWithWebBrowser('http://docs.google.com/forms/d/e/1FAIpQLSdNnbuuEjE506DpK5V9fjoECmd8gzbWYUiH3271iLtFvlR_Nw/viewform')}> Please click here.</Text>
        </Text>
        <Text style={styles.title}>Head Quarter</Text>
        <Text style={styles.info}>Shantivan Complex, Post box No-1, Abu Road (Raj.) 307510</Text>
        <Text style={styles.info}>{`Contact No: 9414151111 / 9999344666\n\n`}</Text>
      </ScrollView>
    );
  }
}

export default About;
