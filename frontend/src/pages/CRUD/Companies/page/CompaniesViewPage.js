import React, { useEffect } from 'react';
import CompaniesWidget from 'pages/CRUD/Companies/page/CompaniesWidget';
import actions from 'actions/companies/companiesFormActions';
import { connect } from 'react-redux';

const CompaniesViewPage = (props) => {

  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id))
  }, [match]);

  return (
    <React.Fragment>
      <CompaniesWidget
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

export default connect(mapStateToProps)(CompaniesViewPage);
