import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'VACANCIES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'VACANCIES_FORM_FIND_STARTED',
      });

      axios.get(`/vacancies/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'VACANCIES_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VACANCIES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/vacancies'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'VACANCIES_FORM_CREATE_STARTED',
      });

      axios.post('/vacancies', { data: values }).then((res) => {
        dispatch({
          type: 'VACANCIES_FORM_CREATE_SUCCESS',
        });

        toast.success('Vacancies created');
        dispatch(push('/admin/vacancies'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VACANCIES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'VACANCIES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/vacancies/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'VACANCIES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Vacancies updated');
        dispatch(push('/admin/vacancies'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VACANCIES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
