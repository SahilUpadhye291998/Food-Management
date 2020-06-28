import React from 'react';
import {Redirect} from 'react-router-dom';

// Layout Types
import {DefaultLayout, CustomLayout} from './layouts';

// Route Views
import BlogOverview from './views/BlogOverview';
import AddNewPost from './views/AddNewPost';
import Errors from './views/Errors';
import ComponentsOverview from './views/ComponentsOverview';
import Tables from './views/Tables';
import BlogPosts from './views/BlogPosts';

import Login from './views/Login';
import Register from './views/Register';
import History from './views/History';
import ViewTransaction from './views/ViewTransaction';
import UserProfileLite from './views/UserProfileLite';
import AuthorizeUser from './views/admin/AuthorizeUser';
import BaseTransaction from './views/transactions/BaseTransaction';

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />,
  },
  {
    path: '/blog-overview',
    layout: DefaultLayout,
    component: BlogOverview,
  },
  {
    path: '/user-profile-lite',
    layout: DefaultLayout,
    component: UserProfileLite,
  },
  {
    path: '/add-new-post',
    layout: DefaultLayout,
    component: AddNewPost,
  },
  {
    path: '/errors',
    layout: DefaultLayout,
    component: Errors,
  },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview,
  },
  {
    path: '/tables',
    layout: DefaultLayout,
    component: Tables,
  },
  {
    path: '/blog-posts',
    layout: DefaultLayout,
    component: BlogPosts,
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
    component: ViewTransaction,
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
