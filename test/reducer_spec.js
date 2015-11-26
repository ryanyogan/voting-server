import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Batman', 'Ants']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Batman'},
      {type: 'VOTE', entry: 'Batman'},
      {type: 'VOTE', entry: 'Ants'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Batman'
    }));
  });

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Batman'] };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Batman']
    }));
  });

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
