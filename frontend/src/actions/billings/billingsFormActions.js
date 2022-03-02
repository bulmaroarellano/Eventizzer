import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'BILLINGS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'BILLINGS_FORM_FIND_STARTED',
      });

      axios.get(`/billings/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'BILLINGS_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'BILLINGS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/billings'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'BILLINGS_FORM_CREATE_STARTED',
      });

      axios.post('/billings', { data: values }).then(res => {
        dispatch({
          type: 'BILLINGS_FORM_CREATE_SUCCESS',
        });

        toast.success('Billings created');
        dispatch(push('/admin/billings'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'BILLINGS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'BILLINGS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/billings/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'BILLINGS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Billings updated');
        dispatch(push('/admin/billings'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'BILLINGS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
