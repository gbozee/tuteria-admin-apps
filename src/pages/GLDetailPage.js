/**@jsx jsx */
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Flex, Box, Text } from '@rebass/emotion';
import { DetailHeader, DetailItem, ListGroup } from './reusables';
import { Button } from 'tuteria-shared/lib/shared/primitives';
import { SessionListItem, getDate } from 'tuteria-shared/lib/shared/reusables';

function getLocaleDateString(date) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}

export default class GLDetailPage extends Component {
  state = {
    data: {
      client: {
        full_name: 'Tioluwani Kolawole',
        email: 'kolawole@gmail.com',
        phone: '+2348078657912',
      },
      sessions: [
        {
          order: 'AABBDDESESS',
          price: 'N3500',
          date: '2018-10-10 9:20:33',
          status: 'completed',
          no_of_hours: 4,
        },
        {
          order: 'AADSSEDDESAAS',
          price: 'N4500',
          date: '2018-10-10 9:20:33',
          status: 'pending',
          no_of_hours: 4,
        },
      ],
      reviews: [
        {
          id: 1,
          modified: '2018-10-10 9:20:33',
          tutor: 'james@example.com',
          client: 'Samuel Umtiti',
          score: 5,
          review:
            'Lorem Khaled Ipsum is a major key to success. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key.',
        },
        {
          id: 2,
          modified: '2018-10-10 9:20:33',
          tutor: 'james@example.com',
          client: 'Samuel Umtiti',
          score: 4,
          review:
            'Lorem Khaled Ipsum is a major key to success. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key.',
        },
      ],
      slug: 'ABSCDEFG',
      budget: 35000,
      duration: '10am - 2pm',
      location: 'Gbagada',
      type: 'January Standard Class',
      start_date:
        'Sat Mar 23 2019 00:00:00 GMT+0100 (West Africa Standard Time)',
      end_date: 'Sun Apr 14 2019 00:00:00 GMT+0100 (West Africa Standard Time)',
      paid: true,
    },
  };
  addReviewToSite = id => {
    console.log(id);
  };
  completePartPaymentSessions = () => {};
  concludeBooking = () => {};
  notifyOnPayment = () => {};
  render() {
    const {
      start_date,
      end_date,
      client,
      budget,
      slug,
      type,
      duration,
      location,
      sessions,
      reviews,
      paid,
    } = this.state.data;
    let date_summary = `${getLocaleDateString(
      start_date
    )} - ${getLocaleDateString(end_date)}`;
    return (
      <>
        <div>
          <DetailHeader heading={`N${budget}`} subHeading={`Slug: ${slug}`} />
          <DetailItem label="Full Name">{client.full_name}</DetailItem>
          <DetailItem label="Email">{client.email}</DetailItem>
          <DetailItem label="Phone">{client.phone}</DetailItem>
        </div>
        <Box my={3}>
          <ListGroup name="Request details" />
          <DetailItem label="Class">{type}</DetailItem>
          <DetailItem label="Duration">{duration}</DetailItem>
          <DetailItem label="Date Summary">{date_summary}</DetailItem>
          <DetailItem label="Location">{location}</DetailItem>
        </Box>
        <Flex
          css={css`
            border-top: 1px solid;
          `}
          pt={3}
        >
          {paid && (
            <>
              <Button mr={3}>Full Payment</Button>
              <Button mr={3}>Part Payment</Button>
            </>
          )}
          <Button onClick={this.notifyOnPayment}>Notify client and tutor on payment</Button>
        </Flex>
        <Box my={3}>
          <ListGroup name="Booking Sessions" />
          {sessions.map((session, index) => {
            return <SessionListItem key={session.order} {...session} />;
          })}
          <Button
            css={css`
              width: 100%;
            `}
            mt={3}
            onClick={this.completePartPaymentSessions}
          >
            Complete Part Payment Sessions
          </Button>
        </Box>
        <Box my={3}>
          <ListGroup name="Reviews" />
          {reviews.map((review, i) => (
            <Flex
              flexDirection="column"
              css={css`
                border-bottom: 1px solid;
              `}
              mb={3}
              pb={3}
            >
              <Text pb={3}>{review.review}</Text>
              <Flex alignItems="center">
                <Text>Date: {getDate(review.modified)}</Text>
                <Button
                  onClick={() => this.addReviewToSite(review.id)}
                  ml={3}
                  css={css`
                    padding-top: 8px;
                    padding-bottom: 8px;
                  `}
                >
                  Add to site
                </Button>
              </Flex>
            </Flex>
          ))}
        </Box>
        <Box my={3}>
          <Button
            css={css`
              width: 100%;
            `}
            onClick={this.concludeBooking}
          >
            Booking Concluded
          </Button>
        </Box>
      </>
    );
  }
}
