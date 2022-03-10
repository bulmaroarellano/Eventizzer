import list from 'reducers/billings/billingsListReducers';
import form from 'reducers/billings/billingsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
