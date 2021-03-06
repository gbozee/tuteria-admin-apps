/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Card, Box, Text } from "@rebass/emotion";
import { DateFilter } from "tuteria-shared/lib/shared/DateFilter";
import Link from "react-router-dom/Link";
import { FormDrawer, RequestForm } from "tuteria-shared/lib/shared/components";
import { SpinnerContainer } from "tuteria-shared/lib/shared/primitives/Spinner";
import { RequestListItem, SectionListPage, SummaryCardList } from "./reusables";
import { useState } from "react";
import { Button } from "tuteria-shared/lib/shared/primitives";
import { useSalesHook } from "./hooks";

const SalesListPage = ({ location, detailPageUrl }) => {
  let {
    state,
    actions: { setSearchParam, setDateFilter, setSelection, serverSearch }
  } = useSalesHook(location);
  let [showModal, setShowModal] = useState(false);
  const onDateFilter = ({ from, to }) => {
    setDateFilter({ from, to });
  };
  const filteredResults = () => {
    return [
      {
        slug: "ABCDESDDESS",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        skill: "IELTS",
        budget: 20000,
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33"
      }
    ];
  };
  const onSearch = () => {};
  const actions = {
    ISSUED: 1,
    COMPLETED: 2,
    PENDING: 4,
    MEETING: 5,
    BOOKED: 6,
    PAYED: 3,
    COLD: 8,
    TO_BE_BOOKED: 11
  };
  return (
    <Flex flexDirection="column">
      <SummaryCardList
        items={[
          {
            name: "Paid Requests",
            amount: 200000,
            count: 3,
            count_text: "Request count"
          },
          {
            name: "Pending Requests",
            amount: 500000,
            count: 30,
            count_text: "Request count"
          },
          { name: "Total Revenue from lessons", amount: 400000, count: 25 },
          { name: "Combined Revenue", amount: 100000, count: 200 }
        ]}
      />
      <Flex justifyContent="flex-end">
        <Button onClick={() => setShowModal(true)}>New Request</Button>
        <FormDrawer isOpen={showModal} onClose={() => setShowModal(false)}>
          <RequestForm />
        </FormDrawer>
      </Flex>
      <Flex flexDirection={"column"}>
        <DateFilter
          onSearchChange={e => {
            setSearchParam(e.target.value);
          }}
          buttonText="This Month"
          searchValue={state.searchParam}
          dateValue={state.dateFilter}
          onChange={onDateFilter}
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
              value: actions.ISSUED,
              label: "issued requests"
            },
            {
              value: actions.COMPLETED,
              label: "completed requests"
            },
            {
              value: actions.PENDING,
              label: "pending requests"
            },
            {
              value: actions.MEETING,
              label: "meet with client"
            },
            {
              value: actions.PAYED,
              label: "paid requests"
            },
            {
              value: actions.COLD,
              label: "cold clients"
            },
            {
              value: actions.TO_BE_BOOKED,
              label: "requests to be booked"
            }
          ]}
        />
      </Flex>
      <SpinnerContainer condition={state.loading}>
        <Flex flexDirection="column">
          <SectionListPage
            data={filteredResults()}
            callback={request => ({
              ...request,
              to: detailPageUrl(request.slug)
            })}
            LinkComponent={Link}
            Component={RequestListItem}
            keyValue="created"
          />
        </Flex>
      </SpinnerContainer>
    </Flex>
  );
};

export default SalesListPage;
