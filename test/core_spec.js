import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';

import { setEntries, nextEntries, vote } from '../src/core';

describe('Core Services Logic', () => {

  describe('#setEntries', () => {

    it('adds the entries to the state', () => {
      const state = fromJS({});
      const entries = fromJS(['Ants', 'Batman']);
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(fromJS({
        entries: ['Ants', 'Batman']
      }));
    });

    it('converts to immutable from JS', () => {
      const state = Map();
      const entries = ['Ants', 'Batman'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(fromJS({
        entries: ['Ants', 'Batman']
      }));
    });

  });

  describe('#nextEntries', () => {

    it('takes the next two entries into a voting state', () => {
      const state = Map({
        entries: List.of('Ants', 'Batman', 'Archer')
      });
      const nextState = nextEntries(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Ants', 'Batman')
        }),
        entries: List.of('Archer')
      }));
    });

  });

  describe('#vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Ants', 'Batman')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Batman')
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Ants', 'Batman'],
          tally: { 'Batman': 1 }
        },
        entries: []
      }));
    });

  });

});
