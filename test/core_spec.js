import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { setEntries } from '../src/core';

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

});
