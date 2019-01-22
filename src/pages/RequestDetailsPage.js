/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import { Text, Flex, Box, Button as RButton } from "@rebass/emotion";
import { Button, DialogButton } from "tuteria-shared/lib/shared/primitives";
import { Input } from "tuteria-shared/lib/shared/LoginPage";
import {
  DetailItem,
  DetailHeader,
  ListGroup,
  TutorDetailHeader,
  RequestListItem,
  SectionListPage,
  BookingDetailHeader,
  getDate
} from "tuteria-shared/lib/shared/reusables";
import { Select } from "./PVerificationDetailPage";

const options = [
  { label: "To be booked", value: "To be booked" },
  { label: "Completed", value: "Completed" },
  { label: "Cold", value: "Cold" }
];

const days = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" }
];

const duration = [
  { label: "10:00am - 2:00pm", value: "10:00am - 2:00pm" },
  { label: "2:00pm - 4:00pm", value: "2:00pm - 4:00pm" }
];

const RemarkForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Box mb={3}>
      <textarea
        css={css`
          width: 100%;
        `}
        placeholder="Enter remark here"
        rows={10}
      />
    </Box>
    <RButton type="submit">Submit remark</RButton>
  </form>
);

class BookingForm extends Component {
  state = {
    fields: this.props.fields || {}
  };
  onChange = (field, callback) => e => {
    let result = callback(e);
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [field]: result
      }
    }));
  };
  onSubmit = () => {
    const { fields } = this.state;
    this.props.onSubmit(fields);
  };
  render() {
    const { fields, reviewOptions } = this.state;
    return (
      <form>
        <Flex flexDirection="column" alignItems="flex-start">
          <Flex
            css={css`
              width: 100%;
            `}
          >
            <Box
              css={css`
                flex: 1;
              `}
              mr={3}
            >
              <Input
                isValid
                label="Start date"
                placeholder="10/1/2019"
                value={fields.start_date}
                onChange={this.onChange("start_date", e => e.target.value)}
              />
            </Box>
            <Box
              css={css`
                flex: 1;
              `}
            >
              <Input
                isValid
                label="Start time"
                placeholder="10:00am"
                value={fields.start_time}
                onChange={this.onChange("start_time", e => e.target.value)}
              />
            </Box>
          </Flex>
          <Flex
            css={css`
              width: 100%;
            `}
          >
            <Box
              css={css`
                flex: 1;
              `}
              mr={3}
            >
              <Input
                isValid
                label="Duration"
                value={fields.duration}
                placeholder="Select lesson duration"
                onChange={this.onChange("duration", e => e.target.value)}
              />
            </Box>
            <Box
              css={css`
                flex: 1;
              `}
            >
              <Select
                options={days}
                value={fields.days}
                label="Days of week"
                placeholder="Select lesson days"
                onChange={this.onChange("days", e => e.target.value)}
              />
            </Box>
          </Flex>
          <Flex
            css={css`
              width: 100%;
            `}
          >
            <Box
              css={css`
                flex: 1;
              `}
            >
              <Input
                isValid
                label="Hours per day"
                placeholder="2"
                value={fields.hours}
                onChange={this.onChange("hours", e => e.target.value)}
              />
            </Box>
          </Flex>
          <Button
            css={css`
              width: 100%;
            `}
            type="submit"
            onClick={this.onSubmit}
          >
            Book Lessons
          </Button>
        </Flex>
      </form>
    );
  }
}

export class RequestDetailPage extends Component {
  state = {
    status: "To be booked",
    data: {
      request: {
        full_name: "Tioluwani Kolawole",
        email: "kolawole.tioluwani@gmail.com",
        phone: "08078657912",
        user: {
          full_name: "Tioluwani Kolawole",
          email: "kolawole.tioluwani@gmail.com",
          phone: "08078657912"
        },
        request_id: "23009",
        no_of_hours: 7,
        per_hour_rate: 2500,
        budget: 35000,
        slug: "ABSCDEFG",
        start_date: "2018-10-10 9:20:33",
        start_time: "9:20:33",
        no_of_students: 3,
        curriculum: "British",
        duration: "3pm - 5pm",
        classes: ["JSS1", "JSS2", "SS1"],
        days: ["Monday", "Wednesday", "Friday", "Saturday"],
        subjects: ["Mathematics", "English Language", "Biology", "Chemistry"],
        expectation:
          "Lorem Khaled Ipsum is a major key to success. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. The first of the month is coming, we have to get money, we have no choice."
      },
      location: {
        area: "lbs",
        state: "Lagos",
        address: "37 Alara street, Onike ",
        vicinity: "Yaba"
      },
      tutors: [
        {
          profile_pic:
            "http://res.cloudinary.com/tuteria/image/upload/v1546853059/vc4x8ljjgaollupn25x0.jpg",
          phone_no: "+2348069269483",
          full_name: "Blessing Avugara",
          verified: true,
          amount_per_hour: 2500,
          years_of_experience: "Between 3 to 5 years",
          email: "blessingozioma123@gmail.com",
          potential_subjects: [
            "Verbal Reasoning",
            "Fine Art",
            "Quantitative Reasoning",
            "Basic Sciences",
            "Basic Mathematics",
            "English Language",
            "Computer Science",
            "Social Studies",
            "Economics",
            "Commerce"
          ]
        },
        {
          profile_pic:
            "http://res.cloudinary.com/tuteria/image/upload/v1546853059/vc4x8ljjgaollupn25x0.jpg",
          phone_no: "+2348069269483",
          full_name: "Blessing Avugara",
          verified: true,
          amount_per_hour: 2500,
          years_of_experience: "Between 3 to 5 years",
          email: "blessingozioma123@gmail.com",
          potential_subjects: [
            "Verbal Reasoning",
            "Fine Art",
            "Quantitative Reasoning",
            "Basic Sciences",
            "Basic Mathematics",
            "English Language",
            "Computer Science",
            "Social Studies",
            "Economics",
            "Commerce"
          ]
        }
      ]
    }
  };
  onStatusChange = e => {
    this.setState({
      status: e.target.value
    });
  };
  filteredResults = () => {
    return [
      {
        slug: "ABCDESDDESS",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33"
      }
    ];
  };
  render() {
    const { request, location, tutors } = this.state.data;
    return (
      <>
        <div>
          {/* <BookingDetailHeader {...request} /> */}
          <TutorDetailHeader
            detail={[
              request.user.email,
              request.user.full_name,
              request.user.phone
            ]}
          >
            <Flex flexDirection="column">
              <Text pb={2}>
                <strong>Slug:</strong> {request.slug}{" "}
              </Text>
              <Text pb={2}>
                <strong>Request ID:</strong> {request.request_id}{" "}
              </Text>
              <Text pb={2}>
                <strong>Budget:</strong> {request.budget}{" "}
              </Text>
              <Text pb={2}>
                <strong>Per hour rate:</strong> {request.per_hour_rate}{" "}
              </Text>
              <Text>
                <strong>Number of hours:</strong> {request.no_of_hours}{" "}
              </Text>
            </Flex>
          </TutorDetailHeader>
        </div>
        <div>
          <ListGroup name="Lesson detail" />
          <DetailItem label="Number of students">
            {request.no_of_students}
          </DetailItem>
          <DetailItem label="Class of children">
            {request.classes.map(value => (
              <span>{value}, </span>
            ))}
          </DetailItem>
          <DetailItem label="Subjects">
            {request.subjects.map(subject => (
              <span>{subject}, </span>
            ))}
          </DetailItem>
          <DetailItem label="Curriculum">{request.curriculum}</DetailItem>
          <DetailItem label="Expectations" flexDirection="column">
            <Text fontSize="18px" lineHeight={2} pt={2}>
              {request.expectation}
            </Text>
          </DetailItem>
        </div>
        <div>
          <ListGroup name="Schedule detail" />
          <DetailItem label="Number of hours">{request.no_of_hours}</DetailItem>
          <DetailItem label="Number of days">{request.days.length}</DetailItem>
          <DetailItem label="Selected days">
            {request.days.map(day => (
              <span>{day}, </span>
            ))}
          </DetailItem>
          <DetailItem label="Duration">{request.duration}</DetailItem>
        </div>
        <div>
          <ListGroup name="List of approved tutors" />
          <Flex alignItems="center">
            <Box
              css={css`
                flex: 1;
              `}
            >
              <Input isValid placeholder="Email of tutor" type="text" />
            </Box>
            <Box ml={3}>
              <Button>Add to pool</Button>
            </Box>
          </Flex>
          {tutors.map(tutor => (
            <Box
              css={css`
                border-bottom: 1px solid #e8e8e8;
              `}
              mb={"16px"}
            >
              <TutorDetailHeader
                image={tutor.profile_pic}
                detail={[
                  tutor.years_of_experience,
                  tutor.full_name,
                  tutor.email,
                  tutor.phone_no
                ]}
              >
                <Text>N{tutor.amount_per_hour}</Text>
                {tutor.verified && <Text>✔</Text>}
              </TutorDetailHeader>
            </Box>
          ))}
        </div>
        <div>
          <Flex alignItems="center">
            <DialogButton
              hideFooter={true}
              heading="Add remark"
              dialogText={<RemarkForm />}
            >
              Give remark
            </DialogButton>
            <Button ml={3}>Send profile to client</Button>
          </Flex>
        </div>
        <Box mt={3}>
          <ListGroup name="Update request status" />
          <Flex justifyContent="space-between" alignItems="center">
            <Text>Status</Text>
            <Select
              options={options}
              value={this.state.status}
              onChange={this.onStatusChange}
            />
          </Flex>
        </Box>
        <div>
          {this.state.status.toLowerCase() === "to be booked" && (
            <DialogButton
              hideFooter={true}
              heading="Create Booking"
              dialogText={
                <BookingForm
                  fields={{
                    start_date: getDate(request.start_date),
                    start_time: request.start_time,
                    duration: request.duration,
                    hours: request.no_of_hours
                  }}
                />
              }
            >
              Create booking
            </DialogButton>
            // <Button>Create Booking</Button>
          )}
          {this.state.status.toLowerCase() === "cold" && (
            <Button>Add to mailing list</Button>
          )}
        </div>
        <Box my={3}>
          <ListGroup name="Previous request by client" />
          {this.filteredResults().map(data => (
            <RequestListItem {...data} />
          ))}
        </Box>
        <Box>
          <ListGroup name="Book lessons" />
          <BookingForm
            fields={{
              start_date: getDate(request.start_date),
              start_time: request.start_time,
              duration: request.duration,
              hours: request.no_of_hours
            }}
          />
        </Box>
      </>
    );
  }
}
