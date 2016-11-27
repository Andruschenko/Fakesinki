import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

const Confidence = (props) => {


  _inferConfidence = () => {
    return true;
  };

  return (
    <Animated.View
      style={[styles.container, props.style, { opacity: props.opacity }]}
    >
      <Text style={styles.text}>
        Confidence level: {props.confidence}
        Chosen box:
      </Text>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#f4c8fa',
    height: 0,
    width: 0,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
});

export default Confidence;