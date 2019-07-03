import { normalize, schema } from 'normalizr';
import { combineReducers, bindActionCreators } from 'redux';
import { merge, head } from 'ramda';

const storySchema = new schema.Entity('stories');
const storyListSchema = [storySchema];

const storyById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_STORY':
      const normalizedData = normalize(action.payload, storySchema);
      const { stories } = normalizedData.entities;
      const id = normalizedData.result
      return {...state, [id] : stories[id] }
    default:
      return state;
  }
};

const allStories = (state = [], action) => {
  switch (action.type) {
    case 'ADD_STORY':
      const normalizedData = normalize(action.payload, storySchema);
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
