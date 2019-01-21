/** @jsx jsx */
import React, { Component } from "react";
import { jsx, css } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { RequestStatusSummary } from "./SListPage";
import { SectionListPage } from "./reusables";
import { SpinnerContainer } from "tuteria-shared/lib/shared/primitives/Spinner";
import { DateFilter } from "tuteria-shared/lib/shared/DateFilter";
import { parseQuery } from "tuteria-shared/lib/shared/utils";
import Link from 'react-router-dom/Link'
import {
  GroupLessonListItem,
  getDate
} from "tuteria-shared/lib/shared/reusables";

export class ClientListPage extends Component {
  constructor(props) {
    super(props);
    let {
      location: { search }
    } = this.props;
    let { from = "", to = "", q = "", status = "" } = parseQuery(search);
    let state = {
      dateFilter: { from, to },
      searchParam: q,
      filter: status
    };
    this.state = {
      selection: "",
      dateFilter: state.dateFilter
    };
  }
  onDateFilter = ({ from, to }) => {
    this.setState({ dateFilter: { from, to } });
  };
  filteredResults = () => {
    return [
      {
        slug: "ABCDESDDESS",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        budget: 40000,
        no_of_students: 5,
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33",
        type: "January Standard Class",
        duration: "10am - 2pm",
        location: "Gbagada",
        start_date:
          "Sat Mar 23 2019 00:00:00 GMT+0100 (West Africa Standard Time)",
        end_date:
          "Sun Apr 14 2019 00:00:00 GMT+0100 (West Africa Standard Time)"
      },
      {
        slug: "ABCDESDEES1",
        full_name: "Dele Alli",
        email: "dele.alli@example.com",
        phone_no: "08033002132",
        budget: 10000,
        no_of_students: 8,
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33",
        type: "January Standard Class",
        duration: "10am - 2pm",
        location: "Gbagada",
        start_date:
          "Wed Apr 24 2019 00:00:00 GMT+0100 (West Africa Standard Time)",
        end_date:
          "Wed June 19 2019 00:00:00 GMT+0100 (West Africa Standard Time)"
      },
      {
        slug: "ABCDESDEES1",
        full_name: "Harry Kane",
        email: "harrykane@example.com",
        phone_no: "08078654412",
        budget: 1000,
        no_of_students: 18,
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33",
        type: "January Standard Class",
        duration: "10am - 2pm",
        location: "Gbagada",
        start_date:
          "Wed Apr 24 2019 00:00:00 GMT+0100 (West Africa Standard Time)",
        end_date:
          "Wed June 19 2019 00:00:00 GMT+0100 (West Africa Standard Time)"
      }
    ];
  };
  onSearch = () => {};
  render() {
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
        <Flex>
          <RequestStatusSummary
            label_name="Request count"
            label="Paid Requests"
            amount={200000}
            no={3}
          />
          <RequestStatusSummary
            label_name="Request count"
            label="Pending Requests"
            no={30}
            amount={500000}
          />
          <RequestStatusSummary
            label="Total Revenue from lessons"
            no={25}
            amount={400000}
          />
          <RequestStatusSummary
            label="Combined Revenue"
            no={200}
            amount={10000000}
          />
        </Flex>
        <Flex flexDirection={"column"}>
          <DateFilter
            onSearchChange={e => {
              this.setState({ searchParam: e.target.value }, () => {});
            }}
            buttonText="This Month"
            searchValue={this.state.searchParam}
            dateValue={this.state.dateFilter}
            onChange={this.onDateFilter}
            onKeyDown={this.serverSearch}
            displayDate={false}
            selection={this.state.selection}
            onFilterChange={e => this.setState({ selection: e.target.value })}
            placeholder="Search by email"
            searchButton={{
              display: true,
              onClick: this.serverSearch
            }}
            filters={[
              {
                name: "Subject",
                selection: "",
                options: [
                  { value: "", label: "Filter by subject" },
                  { value: "Chinese", label: "Chinese" },
                  { value: "IELTS", label: "IELTS" },
                  { value: "Academic", label: "Academic" },
                  { value: "German", label: "German" }
                ]
              },
              {
                name: "Class",
                selection: "",
                options: [{ value: "", label: "Filter by class" }]
              },
              {
                name: "Status",
                selection: "",
                options: [
                  { value: "", label: "Filter by status" },
                  { value: "Not Paid", label: "Not Paid" },
                  { value: "Paid Full", label: "Paid Full" },
                  { value: "Paid Half", label: "Paid Half" }
                ]
              }
            ]}
          />
        </Flex>
        <SpinnerContainer condition={this.state.loading}>
          <Flex flexDirection="column">
            <SectionListPage
              data={this.filteredResults()}
              callback={request => ({
                ...request,
                to: this.props.detailPageUrl(request.slug)
              })}
              LinkComponent={Link}
              Component={GroupLessonListItem}
              keyValue="start_date"
              funcGetter={item =>
                `${item.type} (${getDate(item.start_date)} - ${getDate(
                  item.end_date
                )})`
              }
              orderFunc={(a, b) =>
                new Date(b.start_date).getTime() -
                new Date(a.start_date).getTime()
              }
            />
          </Flex>
        </SpinnerContainer>
      </Flex>
    );
  }
}

export default ClientListPage;
