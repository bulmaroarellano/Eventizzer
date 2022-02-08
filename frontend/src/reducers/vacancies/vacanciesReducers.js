import list from 'reducers/vacancies/vacanciesListReducers';
import form from 'reducers/vacancies/vacanciesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
