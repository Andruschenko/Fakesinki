import { Dimensions }from 'react-native';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
import { normalize } from './normalize';

export const userConfidence = ({
  touchesScreenNr, touchesCardNr, swipesNr, time, lastSwipe, box
}) => {

  let confidence =
    normalize(swipesNr, 4, 1) +
    // nr of stops
    normalize(lastSwipe.dx == 0 ? 90 : Math.abs(Math.atan(lastSwipe.dy / lastSwipe.dx)*180/Math.PI), 90, 5) +
    normalize(Math.sqrt(((lastSwipe.vx/screenWidth) * (lastSwipe.vx/screenWidth)) + ((lastSwipe.vy/screenHeight) * (lastSwipe.vy/screenHeight))), 0, 0.015) +
    normalize(time, 20, 5);

  console.log('Math.sqrt', Math.sqrt(((lastSwipe.vx/screenWidth) * (lastSwipe.vx/screenWidth)) + ((lastSwipe.vy/screenHeight) * (lastSwipe.vy/screenHeight))));

  confidence = swipesNr > 4 ? confidence/2 : confidence;

  const screenEdge = () => {
    switch(box.text) {
      case 'True':
        return 1;
      case 'False':
        return 0;
      default:
        return null;
    }
  };

  return Math.abs( screenEdge() - 0.5 + confidence / 8 );  // Change last value to 10 if nr of stops is added
};
