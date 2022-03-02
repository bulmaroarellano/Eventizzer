import React, { useEffect } from 'react';
import MenuWidget from 'pages/CRUD/Menu/page/MenuWidget';
import actions from 'actions/menu/menuFormActions';
import { connect } from 'react-redux';

const MenuViewPage = (props) => {

  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id))
  }, [match]);

  return (
    <React.Fragment>
      <MenuWidget
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

export default connect(mapStateToProps)(MenuViewPage);
