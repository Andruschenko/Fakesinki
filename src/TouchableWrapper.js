import React, { Component } from 'react';

import { TouchableWithoutFeedback } from 'react-native';

export default class TouchableWrapper extends Component {
  _handleOnPressIn = (event, second) => (
    console.log('event', event, 'second', second)
  );

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => console.log('pressed')}
        onPressIn={this._handleOnPressIn}
      >
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}
