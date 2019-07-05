import { createStore, combineReducers, applyMiddleware } from 'redux';
import storiesReducer from '../components/index/reducers/storiesReducer';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import { LOAD_STORIES, LOAD_STORIES_SUCCESS } from '../actionTypes';
import loadDB from '../firebase-config';

const reducers = combineReducers({
  stories: storiesReducer
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

  console.log(stories)
  yield put({ type: LOAD_STORIES_SUCCESS, payload: stories });
}

function* rootSaga() {
  yield takeEvery(LOAD_STORIES, loadStories);
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
