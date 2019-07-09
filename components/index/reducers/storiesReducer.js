import { normalize, schema } from 'normalizr';
import { combineReducers } from 'redux';
import { merge, contains } from 'ramda';
import { LOAD_STORIES_SUCCESS, ADD_STORY } from '../../../actionTypes';

const storySchema = new schema.Entity('stories');
const storyListSchema = [storySchema];

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
    case LOAD_STORIES_SUCCESS:
      const normalizedData = normalize(action.payload, storyListSchema);
      const { stories } = normalizedData.entities;
      return merge(state, stories);
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
    case LOAD_STORIES_SUCCESS:
      const normalizedData = normalize(action.payload, storyListSchema);
      const { result } = normalizedData;
      return state.concat(result);
    default:
      return state;
  }
};

const baseReducer = combineReducers({
  byId: storyById,
  allIds: allStories
});

export default baseReducer;
