import list from 'reducers/menu/menuListReducers';
import form from 'reducers/menu/menuFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
