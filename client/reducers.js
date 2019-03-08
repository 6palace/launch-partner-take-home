/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import ProfileState from "./MyProfile/ProfileState";

// Combine all reducers into one root reducer
export default combineReducers({
  ProfileState
});
