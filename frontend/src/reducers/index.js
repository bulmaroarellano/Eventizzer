
import auth from 'reducers/auth';
import alerts from 'reducers/auth';
import navigation from 'reducers/navigation';
import layout from 'reducers/layout';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import menu from 'reducers/menu/menuReducers';

import billings from 'reducers/billings/billingsReducers';

import orders from 'reducers/orders/ordersReducers';

import administrator from 'reducers/administrator/administratorReducers';

import companies from 'reducers/companies/companiesReducers';

import customers from 'reducers/customers/customersReducers';

import employes from 'reducers/employes/employesReducers';

import events from 'reducers/events/eventsReducers';

import users from 'reducers/users/usersReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    alerts,
    auth,
    navigation,

    menu,

    billings,

    orders,

    administrator,

    companies,

    customers,

    employes,

    events,

    users,

  });

