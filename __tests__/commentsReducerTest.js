import { createStore, combineReducers } from 'redux';
import commentsReducer from '../components/comments/reducer'

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

