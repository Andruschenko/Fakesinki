/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';

import clamp from 'clamp';

import NoMoreCards from './NoMoreCards.js';
import { getTargetBox2 } from './boxes';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

import Confidence from '../SwipeView/components/Confidence';

// Base Styles. Use props to override these values
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
  },
  yes: {
      borderColor: 'green',
      borderWidth: 2,
      position: 'absolute',
      padding: 20,
      borderRadius: 5,
  },
  yesPosition: {
      top: 20,
      right: 20,
  },
  yesText: {
      fontSize: 16,
      color: 'green',
  },
  no: {
      borderColor: 'red',
      borderWidth: 2,
      position: 'absolute',
      padding: 20,
      borderRadius: 5,
  },
  noPosition: {
    top: 20,
    left: 20,
  },
  noText: {
      fontSize: 16,
      color: 'red',
  }
});

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: this.props.cards ? this.props.cards[0] : null,
      confidenceEnter: new Animated.Value(0),
      confidenceWidth: 0,
      confidenceHeight: 0,
    }
  }

  _goToNextCard() {
    const { loop, card } = this.state;
    const { cards } = this.props;

    let currentCardIdx = cards.indexOf(card);
    let newIdx = currentCardIdx + 1;

    // Checks to see if last card.
    // If props.loop=yes, will start again from the first card.
    const newCard = newIdx > cards.length - 1 ? (loop ? cards[0] : null) : cards[newIdx];

    this.setState({
      card: newCard,
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  _animateConfidenceIn = () => {
    Animated.timing(
      this.state.confidenceEnter,
      { toValue: 1 }
    ).start();
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.cards && nextProps.cards.length > 0){
  //     console.log('in componentWillReceiveProps');
  //     // this.setState({
  //     //   card: nextProps.cards[0]
  //     // })
  //   }
  // }

  _setUpPanResponder = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => yes,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: this._handlePanResponderRelease,
    })
  };

  _handlePanResponderRelease = (e, { vx, vy, dx, dy }) => {
    const { pan : { x, y }, card } = this.state;
    const { onSwipeSuccess, onSwipe } = this.props;
    this.state.pan.flattenOffset();

    var velocity;
    if (vx >= 0) {
      velocity = clamp(vx, 3, 5);
    } else if (vx < 0) {
      velocity = clamp(vx * -1, 3, 5) * -1;
    }

    onSwipe({ vx, vy, dx, dy });

    const targetBox = getTargetBox2(x, y);
    //
    if (targetBox) {
      onSwipeSuccess(card, targetBox, { vx, vy, dx, dy });

      this.props.cardRemoved
        ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
        : null;

      Animated.decay(this.state.pan, {
        velocity: {x: velocity, y: vy},
        deceleration: 0.98
      }).start(this._resetState.bind(this))
    } else {
      this._returnToCenter();
    }
  };

  _returnToCenter = () => {
    Animated.spring(this.state.pan, {
      toValue: {x: 0, y: 0},
      friction: 4
    }).start()
  };

  componentWillMount() {
    this._setUpPanResponder();
  }

  _resetState() {

    //
    // show confidence card
    console.log('your confidence: ', this.props.confidence);
    Promise.resolve()
      .then(() => this.state.pan.setValue({x: 0, y: 0}))
      .then(() => this.state.enter.setValue(0))
      .then(() => this._showConfidence())
      .then(() => new Promise((resolve) => setTimeout(() => { this._removeConfidence(); resolve(); }, 4000)))
      .then(() => this._goToNextCard())
      .then(() => this._animateEntrance())
      .catch(error => alert(error));

  }

  _showConfidence = () => {
    this._animateConfidenceIn();
    this.setState({
      confidenceWidth: 300,
      confidenceHeight: 400,
    })
  };

  _removeConfidence = () => {
    this.setState({
      confidenceWidth: 0,
      confidenceHeight: 0,
    })
  };

  renderNoMoreCards() {
    if (this.props.renderNoMoreCards)
      return this.props.renderNoMoreCards();

    return (
      <NoMoreCards />
    )
  }

  renderCard(cardData) {
    return this.props.renderCard(cardData)
  }

  render() {
    let { pan: { x, y }, enter, } = this.state;
    const {
      noStyle,
      noPositionStyle,
      yesStyle,
      yesPositionStyle,
    } = this.props;

    // TODO: Change location of renderPosition and text depending on drag.

    let [translateX, translateY] = [x, y];

    let rotate = x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let scale = x.interpolate({inputRange: [-200, 0, 200], outputRange: [1, 0.75, 0.5]});
    let opacity = x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    // let scale = enter;

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    // animations for all right-hand swipes
    let yesOpacity = x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yesScale = x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYesStyles = {transform: [{scale: yesScale}], opacity: yesOpacity};

    // animations for all left-hand swipes
    let noOpacity = x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let noScale = x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNoStyles = {transform: [{scale: noScale}], opacity: noOpacity};

        return (
            <View
              style={this.props.containerStyle}
              onTouchStart={this.props.onTouch}
            >
              { this.state.card
                  ? (
                  <Animated.View style={[this.props.cardStyle, animatedCardstyles]} {...this._panResponder.panHandlers}>
                      {this.renderCard(this.state.card)}
                  </Animated.View>
              )
                  : this.renderNoMoreCards() }


              { this.props.renderNo
                ? this.props.renderNo(pan)
                : (
                    this.props.showNo
                    ? (
                      <Animated.View style={[noStyle, noPositionStyle, animatedNoStyles]}>
                          {this.props.noView
                              ? this.props.noView
                              : <Text style={this.props.noTextStyle}>{this.props.noText ? this.props.noText : "False!"}</Text>
                          }
                      </Animated.View>
                      )
                    : null
                  )
              }

              { this.props.renderYes
                ? this.props.renderYes(pan)
                : (
                    this.props.showYes
                    ? (
                      <Animated.View style={[yesStyle, yesPositionStyle, animatedYesStyles]}>
                          {this.props.yesView
                              ? this.props.yesView
                              : <Text style={this.props.yesTextStyle}>{this.props.yesText? this.props.yesText : "True!"}</Text>
                          }
                      </Animated.View>
                    )
                    : null
                  )
              }
              <Confidence
                style={{
                  width: this.state.confidenceWidth,
                  height: this.state.confidenceHeight,
                  left: (screenWidth / 2) - 150,
                  top: (screenHeight / 2) - 200,
                }}
                opacity={this.state.confidenceEnter}
                confidence={this.props.confidence}
                box={this.props.box}
                card={this.state.card}
              />

            </View>
    );
  }
}

SwipeCards.propTypes = {
  onTouch: React.PropTypes.func,
  onSwipeSuccess: React.PropTypes.func,
  onSwipe: React.PropTypes.func,
  cards: React.PropTypes.array,
  renderCards: React.PropTypes.func,
  loop: React.PropTypes.bool,
  renderNoMoreCards: React.PropTypes.func,
  showYes: React.PropTypes.bool,
  showNo: React.PropTypes.bool,
  yesView: React.PropTypes.element,
  yesText: React.PropTypes.string,
  noView: React.PropTypes.element,
  noText: React.PropTypes.string,
  containerStyle: View.propTypes.style,
  cardStyle: View.propTypes.style,
  yesStyle: View.propTypes.style,
  yesPositionStyle: View.propTypes.style,
  yesTextStyle: Text.propTypes.style,
  noStyle: View.propTypes.style,
  noPositionStyle: View.propTypes.style,
  noTextStyle: Text.propTypes.style,
};

SwipeCards.defaultProps = {
  loop: false,
  showYes: true,
  showNo: true,
  containerStyle: styles.container,
  yesStyle: styles.yes,
  yesPositionStyle: styles.yesPosition,
  yesTextStyle: styles.yesText,
  noStyle: styles.no,
  noPositionStyle: styles.noPosition,
  noTextStyle: styles.noText,
};

export default SwipeCards
