import React  from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const Card = (props) => {

  _handleTouch = (event) => (
    props.onTouch(event, 'card')
  );

  return (
    <View
      style={[styles.card, props.style]}
      onTouchStart={_handleTouch}
    >
      <Text style={styles.text}>
        {props.statement}
      </Text>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18}}>
          by {props.source}
        </Text>
        <Image
          style={styles.thumbnail}
          source={{uri: props.source_image}}
        />
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: '#f9f5f5',
    borderWidth: 1,
    elevation: 1,
    height: 400,
    width: 300,
    padding: 20,
  },
  text: {
    flex: 2,
    fontSize: 24,
    marginTop: 10,
  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginLeft: 10,
  }
});

export default Card;