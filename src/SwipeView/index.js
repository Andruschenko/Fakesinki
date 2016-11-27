import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import _ from 'lodash';

import SwipeCards from '../react-native-swipe-cards/SwipeCards';

import { userConfidence } from '../util/userConfidence';

import Card from './components/Card';
import NoMoreCards from './components/NoMoreCards';
import { Cards, Cards2 } from './data';
import { statements as data } from '../../data/test_statements';

const CARD_REFRESH_LIMIT = 3;

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: data,
      outOfCards: false,
      touchesScreenNr: 0,
      touchesCardNr: 0,
      swipes: [],
      time: new Date().getTime(),
    }
  }

  _handleSwipe = ({ vx, vy, dx, dy }) => {
    console.log('vx', vx, 'vy', vy);
    console.log('dx', dx, 'dy', dy);

    this.setState({
      swipes: this.state.swipes.concat([{ vx, vy, dx, dy }])
    });
  };

  _handleSwipeSuccess = (card, box) => {
    const {
      swipes,
      touchesScreenNr,
      touchesCardNr,
      time
    } = this.state;

    console.log('box', box.text);

    userConfidence({
      touchesScreenNr,
      touchesCardNr,
      swipesNr: swipes.length,
      time: new Date().getTime() - time,
      lastSwipe: _.last(swipes),
      box,
    });

    // reset touches and swipes
    this.setState({
      touchesScreenNr: 0,
      touchesCardNr: 0,
      swipes: [],
      time: new Date().getTime(),
    });
  };

  _handleTouch = (event, component) => {
    // console.log(`touched ${component}`);
    const {
      touchesScreenNr,
      touchesCardNr,
    } = this.state;
    switch (component) {
      case 'card':
        this.setState({ touchesCardNr: touchesCardNr + 1 });
        break;
      case 'screen':
        this.setState({ touchesScreenNr: touchesScreenNr + 1 });
        break;
      default:
        break;
    }
  };

  _cardRemoved = (index) => {
    const { cards, outOfCards } = this.state;
    console.log(`The index is ${index}`);

    if (cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${cards.length - index - 1} cards left.`);

      if (!outOfCards) {
        console.log(`Adding ${data.length} more cards`);

        this.setState({
          cards: cards.concat(data),
          outOfCards: true
        })
      }

    }
  };

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        onTouch={this._handleTouch}

        renderCard={(cardData) => <Card {...cardData} onTouch={this._handleTouch} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYes={true}
        showNo={true}

        onSwipeSuccess={this._handleSwipeSuccess}
        onSwipe={this._handleSwipe}
        cardRemoved={this._cardRemoved}
      />
    )
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    flex: 1,
    width: 300,
    height: 300,
  },
});
