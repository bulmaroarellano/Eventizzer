import React, { useEffect } from 'react';
import BillingsWidget from 'pages/CRUD/Billings/page/BillingsWidget';
import actions from 'actions/billings/billingsFormActions';
import { connect } from 'react-redux';

const BillingsViewPage = (props) => {

  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id))
  }, [match]);

  return (
    <React.Fragment>
      <BillingsWidget
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

export default connect(mapStateToProps)(BillingsViewPage);
