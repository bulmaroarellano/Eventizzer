import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'EMPLOYES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'EMPLOYES_FORM_FIND_STARTED',
      });

      axios.get(`/employes/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'EMPLOYES_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EMPLOYES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/employes'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'EMPLOYES_FORM_CREATE_STARTED',
      });

      axios.post('/employes', { data: values }).then(res => {
        dispatch({
          type: 'EMPLOYES_FORM_CREATE_SUCCESS',
        });

        toast.success('Employes created');
        dispatch(push('/admin/employes'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EMPLOYES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'EMPLOYES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/employes/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'EMPLOYES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Employes updated');
        dispatch(push('/admin/employes'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EMPLOYES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
