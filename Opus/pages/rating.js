import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Rating extends Component {
  state = {
    rating: this.props.rating ?? 1,
    animation: new Animated.Value(1),
    numStars: this.props.numStars ?? 5,
    starColor: this.props.starColor ?? 'orange',
    starSize: this.props.starSize ?? 30,
  };
  rate = star => {
    this.setState({rating: star});
  };

  animate = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.state.animation.setValue(1);
    });
  };
  render() {
    const animateScale = this.state.animation.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 1.4, 1],
    });
    const animationStyle = {
      transform: [{scale: animateScale}],
    };

    let stars = [];
    for (let x = 1; x <= this.state.numStars; x++) {
      stars.push(
        <TouchableWithoutFeedback
          key={x}
          onPress={() => {
            this.rate(x);
            this.animate();
          }}>
          <Animated.View style={x <= this.state.rating ? animationStyle : ''}>
            <Star
              filled={x <= this.state.rating ? true : false}
              color={this.state.starColor}
              size={this.state.starSize}
            />
          </Animated.View>
        </TouchableWithoutFeedback>,
      );
    }
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginLeft: 17, marginBottom: 10}}>{stars}</View>
      </View>
    );
  }
}

class Star extends Component {
  render() {
    return (
      <FontAwesome
        style={{marginHorizontal: 1}}
        name={this.props.filled === true ? 'star' : 'star-o'}
        color={this.props.color}
        size={this.props.size}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
