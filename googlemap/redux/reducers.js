import { combineReducers } from 'redux';
import { fromLocation } from './location';

export default combineReducers({
  Location: fromLocation.Reducer,
});