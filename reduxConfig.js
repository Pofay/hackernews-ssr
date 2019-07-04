import { createStore, combineReducers } from 'redux';
import storiesReducer from './components/index/reducers/storiesReducer';

const reducers = combineReducers({
  stories: storiesReducer
});

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */

const makeStore = (initialState, options) =>
  createStore(reducers, initialState);

export default makeStore;
