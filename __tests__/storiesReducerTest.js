import storiesReducer from '../components/index/reducers/storiesReducer';
import { createStore, combineReducers } from 'redux';

const reducerUnderTest = combineReducers({
  stories: storiesReducer
});

it('Returns base state when no action type matches', () => {
  const expected = {
    stories: {
      byId: {},
      allIds: []
    }
  };
  const store = createStore(reducerUnderTest, {});

  store.dispatch({ type: 'SOME_ACTION_TYPE' });
  const actual = store.getState();

  expect(actual).toEqual(expected);
});

it('Adding a Story returns normalized form', () => {
  const apiResponse = {
    by: 'dhouston',
    descendants: 71,
    id: 8863,
    kids: [8980, 8934, 8876],
    score: 111,
    time: 1175714200,
    title: 'My YC app: Dropbox - Throw away your USB drive',
    type: 'story',
    url: 'http://www.getdropbox.com/u/2/screencast.html'
  };

  const expected = {
    stories: {
      byId: {
        '8863': {
          by: 'dhouston',
          descendants: 71,
          id: 8863,
          kids: [8980, 8934, 8876],
          score: 111,
          time: 1175714200,
          title: 'My YC app: Dropbox - Throw away your USB drive',
          type: 'story',
          url: 'http://www.getdropbox.com/u/2/screencast.html'
        }
      },
      allIds: [8863]
    }
  };
  const store = createStore(reducerUnderTest, {});

  store.dispatch({ type: 'ADD_STORY', payload: apiResponse });
  const actual = store.getState();

  expect(actual).toEqual(expected);
});
