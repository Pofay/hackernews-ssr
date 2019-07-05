import { createStore, combineReducers } from 'redux';
import commentsReducer from '../components/comments/reducers';

const reducerUnderTest = combineReducers({
  comments: commentsReducer
});

it('Returns base state when no action type matches', () => {
  const expected = {
    comments: {
      byId: {},
      allIds: []
    }
  };
  const store = createStore(reducerUnderTest, {});

  store.dispatch({ type: 'SOME_ACTION_TYPE' });
  const actual = store.getState();

  expect(actual).toEqual(expected);
});

it('Adding a comment into tree', () => {
  const apiResponse = {
    by: 'norvig',
    id: 2921983,
    kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
    parent: 2921506,
    text:
      "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
    time: 1314211127,
    type: 'comment'
  };

  const expected = {
    comments: {
      byId: {
        '2921983': {
          by: 'norvig',
          id: 2921983,
          kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
          parent: 2921506,
          text:
            "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
          time: 1314211127,
          type: 'comment'
        }
      },
      allIds: [2921983]
    }
  };

  const store = createStore(reducerUnderTest, {});

  store.dispatch({ type: 'ADD_COMMENT', payload: apiResponse });
  const actual = store.getState();

  expect(actual).toEqual(expected);
});
