import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Card = (props) => (
  <View
    style={styles.card}
    onTouchStart={() => console.log('touched card')}
  >
    {/*<Image style={styles.thumbnail} source={{uri: this.props.image}} />*/}
    <Text style={styles.text}>
      Card {props.name}: This is a serious article about some obvious truth.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    height: 150,
    width: 200,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
});

export default Card;