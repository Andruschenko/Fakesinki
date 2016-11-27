import React from 'react';
import { StyleSheet } from 'react-native';

export const NoMoreCards = () => (
  <View style={styles.noMoreCards}>
    <Text>No more cards</Text>
  </View>
);

const styles = StyleSheet.create({
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
