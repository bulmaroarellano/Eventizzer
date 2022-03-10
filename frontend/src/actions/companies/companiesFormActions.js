import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'COMPANIES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'COMPANIES_FORM_FIND_STARTED',
      });

      axios.get(`/companies/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'COMPANIES_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPANIES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/companies'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'COMPANIES_FORM_CREATE_STARTED',
      });

      axios.post('/companies', { data: values }).then(res => {
        dispatch({
          type: 'COMPANIES_FORM_CREATE_SUCCESS',
        });

        toast.success('Companies created');
        dispatch(push('/admin/companies'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPANIES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'COMPANIES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/companies/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'COMPANIES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Companies updated');
        dispatch(push('/admin/companies'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPANIES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
