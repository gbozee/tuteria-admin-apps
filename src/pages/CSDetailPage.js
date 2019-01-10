/** @jsx jsx*/
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Box, Flex, Text, Heading } from '@rebass/emotion';
import {
  BookingDetailHeader,
  ListGroup,
  ListItem,
  getDate,
  SessionListItem,
  RatingComponent,
} from 'tuteria-shared/lib/shared/reusables';
import { Button } from 'tuteria-shared/lib/shared/primitives';

class ReviewForm extends Component {
  state = {
    fields: {
      score: 1,
      text: '',
    },
    reviewOptions: [1, 2, 3, 4, 5],
  };
  onChange = (field, callback) => e => {
    let result = callback(e);
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [field]: result,
      },
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
          <textarea
            css={css`
              width: 100%;
              margin-top: 16px;
              padding: 16px;
              font-size: 16px;
            `}
            placeholder="Enter review here"
            rows={10}
            value={fields.text}
            onChange={this.onChange('text', e => e.target.value)}
          />
          <select
            value={fields.score}
            onChange={this.onChange('score', e => e.target.value)}
            css={css`
              margin: 8px 0;
            `}
          >
            {reviewOptions.map(option => (
              <option key={option} value={option}>
                {option} star
              </option>
            ))}
          </select>
          <Button type="submit" onClick={this.onSubmit}>
            Submit Review
          </Button>
        </Flex>
      </form>
    );
  }
}

export default class CSDetailPage extends Component {
  state = {
    data: {
      request: {
        user: { full_name: 'Mrs Idoka', email: 'idoka@example.com' },
        tutor: {
          full_name: 'Samuel Umtiti',
          email: 'samuel.umtiti@example.com',
        },
        percentage_split: 75,
        skill_name: 'English Language',
        status: 'DELIVERED',
        first_session: '2018-10-12 14:10:33',
        last_session: '2018-10-12 14:10:33',
        total_price: 20000,
        hijack_tutor_link: 'http://www.google.com',
        hijack_client_link: 'http://www.google.com',
        order: 'AABBDDESAAS',
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
          modified: '2018-10-10 9:20:33',
          tutor: 'james@example.com',
          client: 'Samuel Umtiti',
          score: 5,
          review:
            'Lorem Khaled Ipsum is a major key to success. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key.',
        },
        {
          modified: '2018-10-10 9:20:33',
          tutor: 'james@example.com',
          client: 'Samuel Umtiti',
          score: 4,
          review:
            'Lorem Khaled Ipsum is a major key to success. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key.',
        },
      ],
      transactions: [
        {
          amount: 'N2000',
          status: 'EARNING',
          date: '2018-10-10 9:20:33',
          order: 'AA101',
          client_email: 'james@example.com',
          tutor_email: 'Shola@example.com',
          booking: {
            order: 'BookinOrder',
            status: 'COMPLETED',
            start_time: '2018-10-10 9:20:33',
            end_time: '2018-11-10 9:20:33',
          },
          made_payment: true,
        },
        {
          amount: 'N2000',
          status: 'WITHDRAWAL',
          date: '2018-10-10 9:20:33',
          order: 'AA102',
          client_email: 'james@example.com',
          tutor_email: 'Shola@example.com',
          booking: {
            order: 'BookinOrder',
            status: 'COMPLETED',
            start_time: '2018-10-10 9:20:33',
            end_time: '2018-11-10 9:20:33',
          },
          made_payment: true,
        },
      ],
    },
  };
  submitReview = data => {
    console.log(data);
  };
  payTutor = () => {};
  rebook = () => {};
  render() {
    const { request, transactions, sessions, reviews } = this.state.data;
    return (
      <>
        <div>
          <BookingDetailHeader {...request} />
        </div>
        <div>
          <ListGroup name="Sessions" />
          {sessions.map((session, index) => {
            return (
              <SessionListItem
                key={session.order}
                {...session}
                onEdit={() => {}}
              />
            );
          })}

          <Box my={3}>
            <Button
              css={css`
                width: 100%;
              `}
            >
              Add Session
            </Button>
          </Box>
        </div>
        <Box my={3}>
          <ListGroup name="Reviews" />
          {reviews.map((review, index) => {
            return (
              <Flex
                my={3}
                flexDirection="column"
                css={css`
                  border-bottom: 1px solid;
                `}
              >
                <Box pb={3}>
                  <Flex pb={2} alignItems="center">
                    <Text pr={2}>{review.client}</Text>
                    <RatingComponent
                      rating={review.score}
                      color={'rgb(250, 208, 114)'}
                    />
                  </Flex>
                  <Text>{getDate(review.modified)}</Text>
                </Box>
                <Text lineHeight={2} pb={2}>
                  {review.review}
                </Text>
              </Flex>
            );
          })}
        </Box>
        <Box my={3}>
          <ListGroup name="Give client review" />
          <ReviewForm onSubmit={this.submitReview} />
        </Box>
        <Box my={3}>
          <ListGroup name="Actions" />
          <Flex my={3}>
            <Button onClick={this.payTutor} mr={3}>
              Pay Tutor
            </Button>
            <Button onClick={this.rebook}>Rebook</Button>
          </Flex>
        </Box>
        <div>
          <ListGroup name="Transaction records" />
          {transactions.map((transaction, index) => {
            return (
              <ListItem
                onClick={() => {}}
                key={transaction.order}
                onClick={() => {}}
                heading={transaction.amount}
                subHeading={transaction.status}
                rightSection={getDate(transaction.date)}
              />
            );
          })}
        </div>
      </>
    );
  }
}
