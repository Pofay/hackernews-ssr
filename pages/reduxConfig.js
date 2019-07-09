import { createStore, combineReducers, applyMiddleware } from 'redux';
import storiesReducer from '../components/index/reducers/storiesReducer';
import commentsReducer from '../components/comments/reducers';
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { curry, map } from 'ramda';
import { ADD_COMMENT, LOAD_STORIES, ADD_STORY } from '../actionTypes';
import loadDB from '../firebase-config';

const reducers = combineReducers({
  stories: storiesReducer,
  comments: commentsReducer
});

function* loadStories(action) {
  const db = yield call(() => loadDB());
  const ids = yield call(() => db.child('topstories').once('value'));
  const stories = yield call(() =>
    Promise.all(
      ids
        .val()
        .slice(0, 20)
        .map(id =>
          db
            .child('item')
            .child(id)
            .once('value')
        )
    ).then(map(s => s.val()))
  );

  const loadStoriesToStore = map(
    story => put({ type: ADD_STORY, payload: story }),
    stories
  );

  yield all(loadStoriesToStore);
}

function* loadCommentsForStory(action) {
  const db = yield call(() => loadDB());
  const id = action.payload;
  const story = yield select(state => state.stories.byId[id]);
  const comments = yield all(map(deferredLoadComment(db), story.kids));
  const actions = map(c => put({ type: ADD_COMMENT, payload: c }), comments);
  yield all(actions)
}

const deferredLoadComment = curry((db, id) =>
  call(() =>
    db
      .child('item')
      .child(id)
      .once('value')
      .then(c => c.val())
  )
);

function* rootSaga() {
  yield takeEvery(LOAD_STORIES, loadStories);
  yield takeEvery('LOAD_COMMENTS_FOR_STORY', loadCommentsForStory);
}

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
