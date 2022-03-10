import React, { useEffect } from 'react';
import AdministratorWidget from 'pages/CRUD/Administrator/page/AdministratorWidget';
import actions from 'actions/administrator/administratorFormActions';
import { connect } from 'react-redux';

const AdministratorViewPage = (props) => {

  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id))
  }, [match]);

  return (
    <React.Fragment>
      <AdministratorWidget
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

export default connect(mapStateToProps)(AdministratorViewPage);
