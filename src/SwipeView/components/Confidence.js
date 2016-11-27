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
    const { confidence: test } = props;
    if (test<0.2) return "Pants on Fire!";
    else if (test<0.3) return "False";
    else if (test<=0.5) return "Mostly False";
    else if (test<0.7) return "Half-True";
    else if (test<0.8) return "Mostly True";
    else return "True";
  };

  _inferConfidenceLevel = () => {
    const { confidence: test } = props;
    if (test<0.2) return "absolutely confident";
    else if (test<0.3) return "pretty confident";
    else if (test<=0.5) return "unsure";
    else if (test<0.7) return "unsure";
    else if (test<0.8) return "pretty confident";
    else return "absolutely confident";
  };

  _isTrue = () => props.card.ruling == "Half-True" || props.card.ruling == "Mostly True" || props.card.ruling == "True";
  _isFalse = () => props.card.ruling == "Mostly False" || props.card.ruling == "False" || props.card.ruling == "Pants on Fire!";

  _isRight = () => (props.box && props.box.text == "True" && _isTrue()) || (props.box && props.box.text == "False" && _isFalse()) ? true : false;

  _getColor = () => _isRight() ? '#49E563' : '#FC4E4E';

  return (
    <Animated.View
      style={[styles.container, props.style, { opacity: props.opacity, backgroundColor: _getColor() }]}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', padding: 20}}>
        <Text style={{fontSize: 22 }}>
          <Text>We analyzed that you are</Text>
          <Text style={{fontWeight: 'bold'}}> {_inferConfidenceLevel()}</Text>
          <Text> in your judgment.</Text>
        </Text>
        <Text style={styles.text}>
          {_isRight() ? "Yeah! You're right!" : "Sorry, you're wrong!"}
        </Text>
        <Text style={{fontSize: 20 }}>
          {!_isRight() ? props.card.ruling_text : ''}
        </Text>
        <View>
          <Text style={{fontSize: 16, color: '#5B5952'}}>
            Confidence Score: {(Math.abs(0.5 - props.confidence)*200).toFixed(2)}%
          </Text>
        </View>
      </View>

    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 0,
    width: 0,
    borderRadius: 5,
  },
  text: {
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10
  },
});

export default Confidence;