import { reducer, setCats, toggleFavored } from ".";
import cats from '../mocks/cats.json';

describe('Redux store', () => {
  test('should update the cats array', () => {
    const previousState = [];
    expect(reducer(previousState, setCats([cats[0]]))).toEqual([cats[0]])
  })

  test('should toggle the favored value', () => {
    expect(reducer([cats[0], cats[1]], toggleFavored(cats[0].id)))
      .toEqual([{...cats[0], favored: true},cats[1]])
  })
})