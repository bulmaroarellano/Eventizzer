import React, { useEffect } from 'react';
import EmployesWidget from 'pages/CRUD/Employes/page/EmployesWidget';
import actions from 'actions/employes/employesFormActions';
import { connect } from 'react-redux';

const EmployesViewPage = (props) => {

  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id))
  }, [match]);

  return (
    <React.Fragment>
      <EmployesWidget
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

export default connect(mapStateToProps)(EmployesViewPage);
