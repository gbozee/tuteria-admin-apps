/**@jsx jsx */
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { DetailItem, ListGroup, ListItem, getDate } from 'tuteria-shared/lib/shared/reusables';

export default class GLTutorBookingListPage extends Component {
  state = {
    data: [
      {
        full_name: 'Baba Tutor',
        email: 'tutor.baba@gmail.com',
        class_summary: 'January Standard Class',
        no_of_bookings: 8,
        date: '2018-10-10 9:20:33',
      },
      {
        full_name: 'Baba Tutor',
        email: 'tutor.baba@gmail.com',
        class_summary: 'January Standard Class',
        no_of_bookings: 8,
        date: '2018-10-10 9:20:33',
      },
      {
        full_name: 'Baba Tutor',
        email: 'tutor.baba@gmail.com',
        class_summary: 'January Standard Class',
        no_of_bookings: 8,
        date: '2018-10-10 9:20:33',
      },
    ],
  };
  render() {
    const { data } = this.state;
    return data.map((booking, i) => (
      <ListItem
        key={i}
        heading={booking.full_name}
        subHeading={booking.email}
        date={getDate(booking.date)}
        rightSection={<><strong>Number of bookings:</strong> <span>{booking.no_of_bookings}</span></>}
        rightTop={booking.class_summary}
      />
    ));
  }
}
