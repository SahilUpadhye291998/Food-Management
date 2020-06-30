import React from 'react';
import {Redirect} from 'react-router-dom';

// Layout Types
import {DefaultLayout, CustomLayout} from './layouts';

// Route Views
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import History from './views/History';
import TransactionHistory from './views/TransactionHistory';
import TransactionHistorySupplier from './views/TransactionHistorySupplier';
import UserProfileLite from './views/UserProfileLite';
import AuthorizeUser from './views/admin/AuthorizeUser';
import BaseTransaction from './views/transactions/BaseTransaction';

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />,
  },
  {
    path: '/dashboard',
    layout: DefaultLayout,
    exact: true,
    component: Dashboard,
  },
  {
    path: '/login',
    layout: CustomLayout,
    exact: true,
    component: Login,
  },
  {
    path: '/register',
    layout: CustomLayout,
    exact: true,
    component: Register,
  },
  {
    path: '/history',
    layout: DefaultLayout,
    exact: true,
    component: History,
  },
  {
    path: '/transaction-history',
    layout: DefaultLayout,
    exact: true,
    component: TransactionHistory,
  },
  {
    path: '/transaction-history-supplier',
    layout: DefaultLayout,
    exact: true,
    component: TransactionHistorySupplier,
  },
  {
    path: '/admin/authUser',
    layout: DefaultLayout,
    exact: true,
    component: AuthorizeUser,
  },
  {
    path: '/transaction-add',
    layout: DefaultLayout,
    exact: true,
    component: BaseTransaction,
  },
  {
    path: '/profile',
    layout: DefaultLayout,
    exact: true,
    component: UserProfileLite,
  },
];
