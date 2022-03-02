import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'EVENTS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'EVENTS_FORM_FIND_STARTED',
      });

      axios.get(`/events/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'EVENTS_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EVENTS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/events'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'EVENTS_FORM_CREATE_STARTED',
      });

      axios.post('/events', { data: values }).then(res => {
        dispatch({
          type: 'EVENTS_FORM_CREATE_SUCCESS',
        });

        toast.success('Events created');
        dispatch(push('/admin/events'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EVENTS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'EVENTS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/events/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'EVENTS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Events updated');
        dispatch(push('/admin/events'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EVENTS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
