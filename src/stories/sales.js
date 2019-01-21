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
import CSDetailPage from "../pages/CSDetailPage";
import GLTutorDetailPage from "../pages/GLTutorDetailPage";
import GLClientDetailPage from "../pages/GLClientDetailPage";
import GLDetailPage from "../pages/GLDetailPage";
import ClientListPage from "../pages/ClientListPage";
import GLTutorBookingListPage from "../pages/GLTutorBookingListPage";

const RouterWrapper = ({ children, initialIndex = 0, test = true }) => {
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
          <Link to="/requests">Request List Page</Link>
          <Link to="/bookings">Booking List Page</Link>
          <Link to="/booking-working-section">Booking Working Page</Link>
        </Flex>
      }
      routerProps={{
        initialEntries: [
          "/requests",
          "/requests/1228/transactions",
          "/request-bookings",
          "/request-bookings/123",
          "/group-lessons-tutors/123",
          "/group-lesson-tutors",
          "/group-lesson-clients",
          "/group-lesson-clients/123",
          "/group-lesson/123",
          "/bookings",
          "/bookings/AABBDDESEES",
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
  .add("SListPage", () => (
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
  .add("SDetailPage", () => (
    <RouterWrapper initialIndex={1}>
      <Route
        path="/requests/112/transactions"
        render={props => {
          return <RequestDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("CSListPage", () => (
    <RouterWrapper initialIndex={2}>
      <Route
        path="/request-bookings"
        render={props => {
          return <CSListPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("CSDetailPage", () => (
    <RouterWrapper initialIndex={3}>
      <Route
        path="/request-bookings/123"
        render={props => {
          return <CSDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("GLTutorDetailPage", () => (
    <RouterWrapper initialIndex={4}>
      <Route
        path="/group-lessons-tutors/123"
        render={props => {
          return <GLTutorDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("GLTutorBookingListPage", () => (
    <RouterWrapper initialIndex={5}>
      <Route
        path="/group-lesson-tutors"
        render={props => {
          return <GLTutorBookingListPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("GLClientListPage", () => (
    <RouterWrapper initialIndex={6}>
      <Route
        path="/group-lesson-clients"
        exact
        render={props => {
          return (
            <ClientListPage
              {...props}
              detailPageUrl={order => `/group-lesson-client/${order}`}
            />
          );
        }}
      />
    </RouterWrapper>
  ))
  .add("GLClientDetailPage", () => (
    <RouterWrapper initialIndex={7}>
      <Route
        path="/group-lesson-clients/123"
        render={props => {
          return <GLClientDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("GLDetailPage", () => (
    <RouterWrapper initialIndex={8}>
      <Route
        path="/group-lesson/123"
        render={props => {
          return <GLDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("BListPage", () => (
    <RouterWrapper initialIndex={9}>
      <Route
        path="/bookings"
        exact
        render={props => (
          <BListPage {...props} detailPageUrl={order => `/bookings/${order}`} />
        )}
      />
      <Route path="/bookings/:order" component={BDetailPage} />
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
