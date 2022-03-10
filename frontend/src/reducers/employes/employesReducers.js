import list from 'reducers/employes/employesListReducers';
import form from 'reducers/employes/employesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
