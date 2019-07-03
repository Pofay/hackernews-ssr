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

it('Loading a list of stories returns normalized form', () => {
  const apiResponse = [
    {
      by: 'DyslexicAtheist',
      descendants: 65,
      id: 20342791,
      kids: [],
      score: 162,
      time: 1562144982,
      title:
        'Spotify shuts down direct music uploading for independent artists',
      type: 'story',
      url:
        'https://www.altpress.com/news/spotify-independent-artists-upload-music-streaming/'
    },
    {
      by: 'zerogvt',
      descendants: 15,
      id: 20342750,
      kids: [],
      score: 118,
      time: 1562144376,
      title: 'Fungi which appear to perform radiosynthesis',
      type: 'story',
      url: 'https://en.wikipedia.org/wiki/Radiotrophic_fungus'
    }
  ];

  const expected = {
    stories: {
      byId: {
        '20342791': {
          by: 'DyslexicAtheist',
          descendants: 65,
          id: 20342791,
          kids: [],
          score: 162,
          time: 1562144982,
          title:
            'Spotify shuts down direct music uploading for independent artists',
          type: 'story',
          url:
            'https://www.altpress.com/news/spotify-independent-artists-upload-music-streaming/'
        },
        '20342750': {
          by: 'zerogvt',
          descendants: 15,
          id: 20342750,
          kids: [],
          score: 118,
          time: 1562144376,
          title: 'Fungi which appear to perform radiosynthesis',
          type: 'story',
          url: 'https://en.wikipedia.org/wiki/Radiotrophic_fungus'
        }
      },
      allIds: [20342791, 20342750]
    }
  };

  const store = createStore(reducerUnderTest, {});

  store.dispatch({ type: 'LOAD_STORIES', payload: apiResponse });
  const actual = store.getState();

  expect(actual).toEqual(expected);
});
