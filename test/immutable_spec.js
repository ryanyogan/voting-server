import { expect } from 'chai';
import { List, fromJS, Map } from 'immutable';

describe('Immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('A List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Ants', 'Batman');
      let nextState = addMovie(state, 'Goodfellas');

      expect(nextState).to.equal(List.of(
        'Ants',
        'Batman',
        'Goodfellas'
      ));

      expect(state).to.equal(List.of(
        'Ants',
        'Batman'
      ));
    });
  });

  describe('A tree', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Ants', 'Batman')
      });
      let nextState = addMovie(state, 'Goodfellas');

      expect(nextState).to.equal(fromJS({
        movies: ['Ants', 'Batman', 'Goodfellas']
      }));

      expect(state).to.equal(fromJS({
        movies: ['Ants', 'Batman']
      }));
    });
  });
});
