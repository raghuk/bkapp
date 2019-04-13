import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';


class AnimatedCard extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      scaleValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { index } = this.props;
    const { scaleValue } = this.state;

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 600,
      delay: index * 350
    }).start();
  }

  render() {
    const { children } = this.props;
    const { scaleValue } = this.state;

    return (
      <Animated.View style={{ opacity: scaleValue }}>
        { children }
      </Animated.View>
    );
  }
}

export default AnimatedCard;
