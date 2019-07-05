import { createStore, combineReducers, applyMiddleware } from 'redux';
import storiesReducer from '../components/index/reducers/storiesReducer';
import commentsReducer from '../components/comments/reducers';
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { curry, map } from 'ramda';
import {
  ADD_COMMENT,
  LOAD_STORIES,
  LOAD_STORIES_SUCCESS
} from '../actionTypes';
import loadDB from '../firebase-config';

const reducers = combineReducers({
  stories: storiesReducer,
  comments: commentsReducer
});

function* loadStories(action) {
  const db = yield call(() => loadDB());
  const ids = yield call(() => db.child('topstories').once('value'));
  const stories = yield call(
    ids =>
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
      ).then(s => s.map(s => s.val())),
    ids,
    db
  );

  yield put({ type: LOAD_STORIES_SUCCESS, payload: stories });
}

function* loadCommentsForStory(action) {
  const db = yield call(() => loadDB());
  const id = action.payload;
  const story = yield select(state => state.stories.byId[id]);
  const comments = yield all(map(deferredLoadComment(db), story.kids));
  const actions = yield all(
    map(c => put({ type: ADD_COMMENT, payload: c }), comments)
  );

  yield actions;
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
