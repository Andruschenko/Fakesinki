import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import SwipeCards from '../react-native-swipe-cards/SwipeCards';

import Card from './components/Card';
import { Cards, Cards2 } from './data';

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
});

const { screenHeight, screenWidth } = Dimensions.get('window');

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Cards,
      outOfCards: false,
      touchesScreenNr: 0,
      touchesCardNr: 0,
      swipes: [],
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
    // console.log(`swipped card into box ${box.text}`);

    this.state.swipes.map((swipe, key) => {
      console.log('swipe' + key);
    });

    // reset touches and swipes
    this.setState({
      touchesScreenNr: 0,
      touchesCardNr: 0,
      swipes: [],
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
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
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
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
