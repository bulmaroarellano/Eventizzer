import React, { useEffect } from 'react';
import EventsWidget from 'pages/CRUD/Events/page/EventsWidget';
import actions from 'actions/events/eventsFormActions';
import { connect } from 'react-redux';

const EventsViewPage = (props) => {

  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id))
  }, [match]);

  return (
    <React.Fragment>
      <EventsWidget
      loading={loading}
      record={record}
      />
    </React.Fragment>
  );
}

function mapStateToProps(store) {
  return {
    loading: store.users.form.loading,
    record: store.users.form.record,
  };
}

export default connect(mapStateToProps)(EventsViewPage);
