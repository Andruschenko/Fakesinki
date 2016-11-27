import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Confidence = (props) => {

  // _handleTouch = (event) => (
  //   props.onTouch(event, 'card')
  // );

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>
        You are confident
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'blue',
    // elevation: 1,
    height: 300,
    width: 250,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
});

export default Confidence;