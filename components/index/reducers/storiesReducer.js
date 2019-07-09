import { normalize, schema } from 'normalizr';
import { combineReducers } from 'redux';
import { contains } from 'ramda';
import { ADD_STORY } from '../../../actionTypes';

const storySchema = new schema.Entity('stories');

const addStory = (state, action) => {
  const normalizedData = normalize(action.payload, storySchema);
  const { stories } = normalizedData.entities;
  const id = normalizedData.result;
  return { ...state, [id]: stories[id] };
};

const storyById = (state = {}, action) => {
  switch (action.type) {
    case ADD_STORY:
      return addStory(state, action);
    default:
      return state;
  }
};

const addStoryId = (state, action) => {
  const normalizedData = normalize(action.payload, storySchema);
  const { result } = normalizedData;
  return contains(result, state) ? state : state.concat(result);
};

const allStories = (state = [], action) => {
  switch (action.type) {
    case ADD_STORY:
      return addStoryId(state, action);
    default:
      return state;
  }
};

const baseReducer = combineReducers({
  byId: storyById,
  allIds: allStories
});

export default baseReducer;
