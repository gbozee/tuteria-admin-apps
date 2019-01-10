/**@jsx jsx */
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { ListItem } from 'tuteria-shared/lib/shared/reusables';

export default class GLClientListPage extends Component {
  state = {
    data: [
      {
        full_name: 'Baba Tutor',
        email: 'tutor.baba@gmail.com',
        session: 8,
        date: '2018-10-10 9:20:33',
        paid: true,
        payment_type: 'part payment'
      },
      {
        full_name: 'Baba Tutor',
        email: 'tutor.baba@gmail.com',
        class_summary: 'January Standard Class',
        session: 2,
        paid: true,
        payment_type: 'part payment'
      },
      {
        full_name: 'Baba Tutor',
        email: 'tutor.baba@gmail.com',
        session: 3,
        paid: true,
        payment_type: 'complete payment'
      },
    ],
  };
  render() {
    const { data } = this.state;
    return data.map((client, i) => (
      <ListItem
        key={i}
        heading={client.full_name}
        subHeading={client.email}
        rightSection={<><strong>Sessions:</strong> <span>{client.session}</span></>}
        rightTop={client.payment_type}
      />
    ));
  }
}
