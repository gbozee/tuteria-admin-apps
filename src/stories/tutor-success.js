/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { Flex } from "@rebass/emotion";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import LoginPage from "tuteria-shared/lib/shared/LoginPage";
import TutorListPage from "../pages/TutorListPage";
import { MemoryRouter as Router, Route } from "react-router";
import { Link } from "react-router-dom";
import { Button, Welcome } from "@storybook/react/demo";
import TutorDetailPage from "../pages/TutorDetailPage";
import WorkingSection from "../pages/WorkingSection";
import appContext from "../appContext";
import appFirebase from "../adapters/backupFirebase";
import devAdapter from "../adapters/dev";
import WithRouter from "tuteria-shared/lib/shared/PageSetup";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
const RouterWrapper = ({ children, initialIndex = 0, test = true }) => {
  return (
    <WithRouter
      test={test}
      RouterComponent={Router}
      routerProps={{
        initialEntries: [
          "/tutor-list",
          "/tutor-list/jamesa",
          "/tutor-working-section"
        ],
        initialIndex
      }}
      adapter={devAdapter}
      context={appContext}
      firebase={appFirebase}
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
          <Link to="/tutor-list">Tutor List Page</Link>
          <Link to="/tutor-working-section">Tutor Working Section</Link>
        </Flex>
      }
    >
      {children}
    </WithRouter>
  );
};
storiesOf("Tutor Success Application", module)
  .add("Tutor List Page", () => (
    <RouterWrapper>
      <Route
        path="/tutor-list"
        render={props => (
          <TutorListPage
            {...props}
            detailPageUrl={slug => `/tutor-list/${slug}`}
          />
        )}
      />
    </RouterWrapper>
  ))
  .add("Tutor Detail Page", () => (
    <RouterWrapper initialIndex={1}>
      <Route path="/tutor-list/:slug" component={TutorDetailPage} />
    </RouterWrapper>
  ))
  .add("Tutor Working Section", () => (
    <RouterWrapper initialIndex={2}>
      <Route
        path="/tutor-list"
        exact
        render={props => (
          <TutorListPage
            {...props}
            detailPageUrl={slug => `/tutor-list/${slug}`}
          />
        )}
      />
      <Route path="/tutor-list/:slug" component={TutorDetailPage} />
      <Route
        path="/tutor-working-section"
        render={props => (
          <WorkingSection
            {...props}
            detailPageUrl={slug => `/worked-records/${slug}?email=true`}
          />
        )}
      />
      <Route path="/worked-records/:email" component={TutorDetailPage} />
    </RouterWrapper>
  ));
