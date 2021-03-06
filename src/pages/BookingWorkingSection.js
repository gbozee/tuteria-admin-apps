/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import React from "react";
import { DataContext } from "tuteria-shared/lib/shared/DataContext";
import { Button } from "tuteria-shared/lib/shared/primitives";
import { SectionListPage } from "tuteria-shared/lib/shared/reusables";
import { DateFilter } from "tuteria-shared/lib/shared/DateFilter";
import { Link } from "react-router-dom";

export class BookingWorkingSection extends React.Component {
  static contextType = DataContext;
  state = {
    selection: "",
    searchParams: "",
    data: []
  };
  componentDidMount() {
    let { dispatch, actions } = this.context;
    dispatch({ type: actions.FETCH_BOOKING_WORKING_DATA }).then(data => {
      this.setState({ data });
    });
  }
  getFilteredResult() {
    let { data, selection, searchParams } = this.state;
    let result = selection
      ? data.filter(x => x.actions.includes(selection))
      : data;
    result =
      Boolean(searchParams) && searchParams.length > 2
        ? result.filter(x => x.email.includes(searchParams))
        : result;
    return result;
  }
  onSearch = e => {
    this.setState({ searchParams: e.target.value });
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
    }
  };
  saveProgress = () => {
    let { dispatch, actions } = this.context;
    dispatch({ type: actions.SAVE_PROGRESS });
  };
  render() {
    return (
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <DateFilter
            onSearchChange={this.onSearch}
            onKeyDown={this.onKeyDown}
            displayDate={false}
            selection={this.state.selection}
            // onFilterChange={e => this.setState({ selection: e.target.value })}
            placeholder="Search by email"
            // filterOptions={[
            // { value: "", label: "All" },
            // {
            //   value: actions.EMAIL_VERIFICATION,
            //   label: "Email Verification"
            // },
            // { value: actions.ID_VERIFICATION, label: "ID Verification" },
            // {
            //   value: actions.PROFILE_VERIFICATION,
            //   label: "Profile Pic Verification"
            // }
            // ]}
          />
        </Flex>
        <Button
          width={1 / 4}
          css={css`
            :active {
              opacity: 0.7;
            }
            :hover {
              cursor: pointer;
            }
          `}
          onClick={this.saveProgress}
        >
          Save Progress
        </Button>
        <Flex flexDirection="column">
          <SectionListPage
            data={this.getFilteredResult()}
            callback={record => ({
              heading: record.full_name,
              subHeading: record.email,
              rightSection: record.actions.map((x, i) => (
                <div key={`${x}-${i}`}>{x}</div>
              )),
              to: this.props.detailPageUrl(record.email)
            })}
            LinkComponent={Link}
          />
        </Flex>
      </Flex>
    );
  }
}

export default BookingWorkingSection;
