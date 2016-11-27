const SWIPE_X_THRESHOLD = 120;
const SWIPE_Y_THRESHOLD = 80;

/**
 * Handle 6 cases:
 * True, Mostly True, Half-True, Mostly False, False, Pants on Fire!
 *
 * @param x
 * @param y
 */
export const getTargetBox6 = (x, y) => {
  const boxes = [
    { id: 0, text: 'True', value: x._value < -SWIPE_X_THRESHOLD && y._value > SWIPE_Y_THRESHOLD },
    { id: 1, text: 'Mostly True', value: x._value < -SWIPE_X_THRESHOLD && y._value > -SWIPE_Y_THRESHOLD && y._value < SWIPE_Y_THRESHOLD },
    { id: 2, text: 'Half-True', value: x._value < -SWIPE_X_THRESHOLD && y._value > -SWIPE_Y_THRESHOLD },
    { id: 3, text: 'Mostly False', value: x._value > SWIPE_X_THRESHOLD && y._value < -SWIPE_Y_THRESHOLD },
    { id: 4, text: 'False', value: x._value > SWIPE_X_THRESHOLD && y._value > -SWIPE_Y_THRESHOLD && y._value < SWIPE_Y_THRESHOLD},
    { id: 5, text: 'Pants on Fire!', value: x._value > SWIPE_X_THRESHOLD && y._value > SWIPE_Y_THRESHOLD },
  ];
  return boxes.find(box => box.value === true);
};

export const getTargetBox2 = (x, y) => {
  const boxes = [
    { id: 1, text: 'True', value: x._value > SWIPE_X_THRESHOLD },
    { id: 0, text: 'False', value: x._value < -SWIPE_X_THRESHOLD },
  ];
  return boxes.find(box => box.value === true);
};
