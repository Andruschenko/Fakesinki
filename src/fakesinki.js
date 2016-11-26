import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import SwipeView from './SwipeView';
// import TouchableWrapper from './TouchableWrapper';
//
// class App extends Component {
//   render() {
//     return (
//       <TouchableWrapper>
//         <SwipeView />
//       </TouchableWrapper>
//     );
//   }
// }

export default function native() {
  AppRegistry.registerComponent('Fakesinki', () => SwipeView);
}
