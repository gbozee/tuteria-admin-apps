/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { Flex } from "@rebass/emotion";
import { Link } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import LoginPage from "tuteria-shared/lib/shared/LoginPage";
import SListPage from "../pages/SListPage";
import BListPage from "../pages/BListPage";
import BDetailPage from "../pages/BDetailPage";
import BookingWorkingSection from "../pages/BookingWorkingSection";
import { MemoryRouter as Router, Route, Switch } from "react-router";
import { testData, testDataTransactions } from "../adapters/test_data";
import devAdapter from "../adapters/dev";
import WithRouter from "tuteria-shared/lib/shared/PageSetup";
import testServerAdapter from "../adapters/test";
import bookingContext from "../bookingContext";
import appFirebase from "../adapters/backupFirebase";
import { RequestDetailPage } from "../pages/RequestDetailsPage";
import CSListPage from "../pages/CSListPage";
import GLTutorDetailPage from "../pages/GLTutorDetailPage";
import GLClientDetailPage from "../pages/GLClientDetailPage";
import GLDetailPage from "../pages/GLDetailPage";
import ClientListPage from "../pages/ClientListPage";
import GLTutorBookingListPage from "../pages/GLTutorBookingListPage";

const RouterWrapper = ({
  children,
  initialIndex = 0,
  test = true,
  topLinks
}) => {
  return (
    <WithRouter
      test={test}
      RouterComponent={Router}
      heading={
        <Flex
          pb={3}
          justifyContent="space-between"
          css={css`
            flex-wrap: wrap;
            > a {
              padding-right: 10px;
              padding-bottom: 10px;
            }
          `}
        >
          {topLinks}
        </Flex>
      }
      routerProps={{
        initialEntries: [
          "/requests/one-on-one",
          "/requests/one-on-one/1228/transactions",
          "/requests/group",
          "/request/group/123",
          "/request-bookings",
          "/request-bookings/123",
          "/bookings/one-on-one",
          "/bookings/one-on-one/AABBDDESEES",
          "/bookings/group",
          "/bookings/group/123",
          "/booking-working-section"
        ],
        initialIndex
      }}
      adapter={devAdapter}
      context={bookingContext}
      firebase={appFirebase}
    >
      {children}
    </WithRouter>
  );
};
storiesOf("Sales and Customer Success Application", module)
  .add("Requests List Page", () => (
    <RouterWrapper
      topLinks={
        <React.Fragment>
          <Link to="/requests/one-on-one">Regular Requests</Link>
          <Link to="/requests/group">Group Requests</Link>
          <Link to="/requests/group/ADDESS">Group Request Detail</Link>
          <Link to="/request-working-section">Request Working Section</Link>
        </React.Fragment>
      }
    >
      <Route
        path="/requests/one-on-one"
        exact
        render={props => {
          return (
            <SListPage
              {...props}
              detailPageUrl={order =>
                `/requests/one-on-one/${order}/transactions`
              }
            />
          );
        }}
      />
      <Route
        path="/requests/one-on-one/:slug/transactions"
        render={props => {
          return <RequestDetailPage {...props} />;
        }}
      />
      <Route
        path="/requests/group"
        exact
        render={props => {
          return (
            <ClientListPage
              {...props}
              detailPageUrl={order => `/requests/group/${order}`}
            />
          );
        }}
      />
      <Route
        path="/requests/group/:slug"
        exact
        render={props => {
          return <GLClientDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("Booking List Page", () => (
    <RouterWrapper
      initialIndex={6}
      topLinks={
        <React.Fragment>
          <Link to="/bookings/one-on-one">Bookings</Link>
          <Link to="/bookings/group">Group lesson bookings</Link>
          <Link to="/request-bookings">Kola Bookings</Link>
          <Link to="/bookings/one-on-one/ADDESS">Booking Detail Page</Link>
          <Link to="/booking-working-section">Booking Working Page</Link>
        </React.Fragment>
      }
    >
      <Route
        path="/request-bookings"
        render={props => {
          return <CSListPage {...props} />;
        }}
      />
      <Route
        path="/bookings/group"
        exact
        render={props => {
          return <GLTutorBookingListPage {...props} />;
        }}
      />
      <Route
        path="/bookings/group/:order"
        render={props => {
          return <GLTutorDetailPage {...props} />;
        }}
      />
      <Route
        path="/bookings/one-on-one"
        exact
        render={props => (
          <BListPage {...props} detailPageUrl={order => `/bookings/${order}`} />
        )}
      />
      <Route
        path="/bookings/one-on-one/:order"
        render={props => {
          return <BDetailPage {...props} />;
        }}
      />
      <Route
        path="/booking-working-section"
        render={props => (
          <BookingWorkingSection
            {...props}
            detailPageUrl={slug => `/bookings/${slug}`}
          />
        )}
      />
    </RouterWrapper>
  ));
