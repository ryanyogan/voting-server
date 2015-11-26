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

    describe('next state voting logic', () => {

      it('puts the winner of the current vote back to the entries list', () => {
        const state = Map({
          vote: Map({
            pair: List.of('Ants', 'Batman'),
            tally: Map({
              'Batman': 10,
              'Ants': 2
            })
          }),
          entries: List.of('Goodfellas', 'Apollo 13', 'The Rock')
        });
        const nextState = nextEntries(state);
        expect(nextState).to.equal(Map({
          vote: Map({
            pair: List.of('Goodfellas', 'Apollo 13')
          }),
          entries: List.of('The Rock', 'Batman')
        }));
      });
    });

    it('puts both entries back if the vote was a tie', () => {
      const state = fromJS({
        vote: {
          pair: ['Ants', 'Batman'],
          tally: {
            'Ants': 3,
            'Batman': 3
          }
        },
        entries: ['Goodfellas', 'The Rock', 'Apollo 13']
      });
      const nextState = nextEntries(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Goodfellas', 'The Rock')
        }),
        entries: List.of('Apollo 13', 'Ants', 'Batman')
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

    it('adds to existing tally for the voted entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Ants', 'Batman'],
          tally: { 'Batman': 2, 'Ants': 1 }
        },
        entries: []
      });
      const nextState = vote(state, 'Batman');
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Ants', 'Batman'],
          tally: { 'Batman': 3, 'Ants': 1 }
        },
        entries: []
      }));
    });

  });

});
