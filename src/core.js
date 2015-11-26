import { List, Map } from 'immutable';

const getWinners = (vote) => {
  if (!vote) return []; // No vote

  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a, b]; //Tie, return both
}

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function nextEntries(state) {
  const entries = state.get('entries').
    concat(getWinners(state.get('vote')));

  if (entries.count() === 1) {
    return state.remove('vote').
      remove('entries').
      set('winner', entries.first());
  }
  else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
