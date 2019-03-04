/** @jsx jsx */
import { useState } from "react";
import { css, jsx } from "@emotion/core";
import { Flex, Card, Box, Text } from "@rebass/emotion";
import { DateFilter } from "tuteria-shared/lib/shared/DateFilter";
import { parseQuery } from "tuteria-shared/lib/shared/utils";
import { Link } from "react-router";
import { SpinnerContainer } from "tuteria-shared/lib/shared/primitives/Spinner";
import { RequestListItem, SectionListPage } from "./reusables";
import { BookingListItem } from "tuteria-shared/lib/shared/reusables";
import { useSalesHook } from "./hooks";

const CustomerSuccessListPage = ({ location }) => {
  let {
    state,
    actions: { setSearchParam, setDateFilter, setSelection }
  } = useSalesHook(location);
  const filteredResults = () => {
    return [
      {
        user: { full_name: "Mrs Ego", email: "ego@example.com" },
        tutor: {
          full_name: "Jamie novako",
          email: "jamie@example.com"
        },
        percentage_split: 75,
        skill_name: "English Language",
        status: "DELIVERED",
        first_session: "2018-10-12 14:10:33",
        last_session: "2018-10-12 14:10:33",
        total_price: 20000,
        hijack_tutor_link: "http://www.google.com",
        hijack_client_link: "http://www.google.com",
        order: "AABBDDESEES"
      },
      {
        user: { full_name: "Mrs Idoka", email: "idoka@example.com" },
        tutor: {
          full_name: "Samuel Umtiti",
          email: "samuel.umtiti@example.com"
        },
        percentage_split: 75,
        skill_name: "English Language",
        status: "DELIVERED",
        first_session: "2018-10-12 14:10:33",
        last_session: "2018-10-12 14:10:33",
        total_price: 20000,
        hijack_tutor_link: "http://www.google.com",
        hijack_client_link: "http://www.google.com",
        order: "AABBDDESAAS"
      }
    ];
  };
  const onSearch = () => {};
  const actions = {
    DATE_CREATED: 1,
    DATE_STARTED: 2,
    DATE_COMPLETED: 4
  };
  const data = filteredResults();
  return (
    <Flex flexDirection="column">
      <Flex flexDirection={"column"}>
        <DateFilter
          onSearchChange={e => {
            setSearchParam(e.target.value);
          }}
          buttonText="This Month"
          searchValue={state.searchParam}
          dateValue={state.dateFilter}
          onChange={({ from, to }) => {
            setDateFilter({ from, to });
          }}
          onKeyDown={serverSearch}
          displayDate={false}
          selection={state.selection}
          onFilterChange={e => setSelection(e.target.value)}
          placeholder="Search by email"
          searchButton={{
            display: true,
            onClick: serverSearch
          }}
          filterOptions={[
            { value: "", label: "All" },
            {
              value: actions.DATE_CREATED,
              label: "date created"
            },
            {
              value: actions.DATE_STARTED,
              label: "date started"
            },
            {
              value: actions.DATE_COMPLETED,
              label: "date completed"
            }
          ]}
        />
      </Flex>
      <SpinnerContainer condition={loading}>
        {data.map(item => (
          <BookingListItem {...item} />
        ))}
        {/* <Flex flexDirection="column">
            <SectionListPage
              data={this.filteredResults()}
              callback={request => request}
              Component={BookingListItem}
              keyValue="first_session"
            />
          </Flex> */}
      </SpinnerContainer>
    </Flex>
  );
};

export default CustomerSuccessListPage;
