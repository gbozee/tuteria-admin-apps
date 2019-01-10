import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import LoginPage from 'tuteria-shared/lib/shared/LoginPage';
import SListPage from '../pages/SListPage';
import CSListPage from '../pages/CSListPage';
import CSDetailPage from '../pages/CSDetailPage';
import GLDetailPage from '../pages/GLDetailPage';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import { testData, testDataTransactions } from '../adapters/test_data';
import devAdapter from '../adapters/dev';
import WithRouter from 'tuteria-shared/lib/shared/PageSetup';
import testServerAdapter from '../adapters/test';
import paymentContext from '../paymentContext';
import appFirebase from '../adapters/backupFirebase';
import { RequestDetailPage } from '../pages/RequestDetailsPage';

const RouterWrapper = ({ children, initialIndex = 0, test = true }) => {
  return (
    <WithRouter
      test={test}
      RouterComponent={Router}
      routerProps={{
        initialEntries: [
          '/requests',
          '/requests/1228/transactions',
          '/request-bookings',
          '/request-bookings/123',
          '/group-lessons'
        ],
        initialIndex,
      }}
      adapter={devAdapter}
      context={paymentContext}
      firebase={appFirebase}
    >
      {children}
    </WithRouter>
  );
};
storiesOf('Sales and Customer Success Application', module)
  .add('SListPage', () => (
    <RouterWrapper>
      <Route
        path="/requests"
        exact
        render={props => {
          return (
            <SListPage
              {...props}
              detailPageUrl={order => `/requests/${order}/transactions`}
            />
          );
        }}
      />
    </RouterWrapper>
  ))
  .add('SDetailPage', () => (
    <RouterWrapper initialIndex={1}>
      <Route
        path="/requests/1228/transactions"
        render={props => {
          return <RequestDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add('CSListPage', () => (
    <RouterWrapper initialIndex={2}>
      <Route
        path="/request-bookings"
        render={props => {
          return <CSListPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add('CSDetailPage', () => (
    <RouterWrapper initialIndex={3}>
      <Route
        path="/request-bookings/123"
        render={props => {
          return <CSDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add('GLDetailPage', () => (
    <RouterWrapper initialIndex={4}>
      <Route
        path="/group-lessons"
        render={props => {
          return <GLDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ));
