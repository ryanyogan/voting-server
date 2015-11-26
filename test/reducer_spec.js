import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Batman']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Batman']
    }));
  });

  it('handes NEXT', () => {
    const initialState = fromJS({
      entries: ['Batman', 'Ants']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Batman', 'Ants']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: [
          'Ants',
          'Batman'
        ]
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'Batman' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [
          'Ants', 'Batman'
        ],
        tally: {'Batman': 1}
      },
      entries: []
    }));
  });

});
