import list from 'reducers/companies/companiesListReducers';
import form from 'reducers/companies/companiesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
