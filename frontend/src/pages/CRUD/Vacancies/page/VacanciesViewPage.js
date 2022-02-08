import React, { useEffect } from 'react';
import VacanciesWidget from 'pages/CRUD/Vacancies/page/VacanciesWidget';
import actions from 'actions/vacancies/vacanciesFormActions';
import { connect } from 'react-redux';

const VacanciesViewPage = (props) => {
  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [match]);

  return (
    <React.Fragment>
      <VacanciesWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.users.form.loading,
    record: store.users.form.record,
  };
}

export default connect(mapStateToProps)(VacanciesViewPage);
