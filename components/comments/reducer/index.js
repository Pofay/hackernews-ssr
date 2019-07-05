import { combineReducers } from 'redux';

const commentsById = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  byId: commentsById,
  allIds: allComments
});
