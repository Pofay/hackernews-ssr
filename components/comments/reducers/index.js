import { combineReducers } from 'redux';
import { merge } from 'ramda';
import { normalize, schema } from 'normalizr';

const commentSchema = new schema.Entity('comments');

const commentsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      const normalizedData = normalize(action.payload, commentSchema);
      const { comments } = normalizedData.entities;
      const { result } = normalizedData;
      return { ...state, [result]: comments[result] };
    default:
      return state;
  }
};

const allComments = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      const normalizedData = normalize(action.payload, commentSchema);
      const { result } = normalizedData;
      return state.concat(result);
    default:
      return state;
  }
};

export default combineReducers({
  byId: commentsById,
  allIds: allComments
});
