/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Card, Box, Text } from "@rebass/emotion";
import { DateFilter } from "tuteria-shared/lib/shared/DateFilter";
import { parseQuery } from "tuteria-shared/lib/shared/utils";
import { Link } from "react-router-dom";
import Modal from "tuteria-shared/lib/shared/primitives/Modal";
import { Button } from "tuteria-shared/lib/shared/primitives";
import { SpinnerContainer } from "tuteria-shared/lib/shared/primitives/Spinner";
import { DataContext } from "tuteria-shared/lib/shared/DataContext";
import {
  RequestListItem,
  SectionListPage,
  BookingListItem
} from "tuteria-shared/lib/shared/reusables";
import React from "react";

class SalesListPage extends React.Component {
  static contextType = DataContext;
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
      ...state,
      selection: "",
      dateFilter: state.dateFilter,
      bookings: [],
      selectedBooking: null,
      displayModal: false,
      remark: null
    };
  }
  componentDidMount() {
    this.fetchList(true);
  }
  fetchList = (refresh = false) => {
    let { dispatch, actions } = this.context;
    dispatch({
      type: actions.GET_ALL_BOOKINGS,
      value: { refresh, q: this.state.searchParam }
    }).then(data => {
      this.setState({ bookings: data });
    });
  };
  refreshList = () => {
    this.fetchList(true);
  };
  onDateFilter = ({ from, to }) => {
    this.setState({ dateFilter: { from, to } });
  };
  serverSearch = e => {
    if (e.keyCode) {
      if (e.keyCode === 13) {
        this.fetchList(true);
      }
    } else {
      this.fetchList(true);
    }
  };
  filteredResults = () => {
    let { searchParams, filter } = this.state;
    let result = this.state.bookings;
    // if (
    //   (!Boolean(searchParams) || searchParams.length <= 3) &&
    //   !Boolean(filter)
    // ) {
    //   return result;
    // }
    // let records = result.filter(x => {
    //   let searchFilter =
    //     searchParams.length === 0
    //       ? false
    //       : x.order.toLowerCase().includes(searchParams.toLowerCase());
    //   let methodFilter = x.status.toLowerCase() === filter.toLowerCase();
    //   return searchFilter || methodFilter;
    // });
    return result;
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
        <SpinnerContainer condition={this.state.loading}>
          <Flex flexDirection="column">
            <SectionListPage
              data={this.filteredResults()}
              callback={request => ({
                ...request,
                // onClick: () => {
                //   this.setState({
                //     displayModal: true,
                //     selectedBooking: request
                //   });
                // }
                to: this.props.detailPageUrl(request.order)
              })}
              LinkComponent={Flex}
              Component={BookingListItem}
              keyValue="created"
            />
          </Flex>
          <Modal
            showModal={this.state.displayModal}
            handleCloseModal={() => {
              this.setState({ displayModal: false });
            }}
            hideFooter
          >
            <Flex flexDirection="column">
              <textarea
                onChange={e => {
                  this.setState({ remark: e.target.value });
                }}
                rows={6}
                placeholder="drop comment for tunde"
              />
              <Button
                onClick={() => {
                  let { dispatch, actions } = this.context;
                  dispatch({
                    type: actions.NOTIFY_AGENT_ABOUT_ACTION_TO_TAKE,
                    value: {
                      remark: this.state.remark,
                      order: this.state.selectedBooking.order
                    }
                  }).then(() => {
                    this.setState({ displayModal: false, remark: null });
                  });
                }}
                mt={2}
              >
                Notify Booking Agent.
              </Button>
            </Flex>
          </Modal>
        </SpinnerContainer>
      </Flex>
    );
  }
}

export default SalesListPage;
