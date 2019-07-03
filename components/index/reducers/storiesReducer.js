import { normalize, schema } from 'normalizr';
import { merge } from 'ramda';

const storySchema = new schema.Entity('stories');
const storyListSchema = [storySchema];

