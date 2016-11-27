import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';

import SwipeView from './SwipeView';
// import TouchableWrapper from './TouchableWrapper';
//
class App extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#35526B',  }}
      >
        <SwipeView />
      </View>
    );
  }
}

export default function native() {
  AppRegistry.registerComponent('Fakesinki', () => App);
}
