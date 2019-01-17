/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Flex } from '@rebass/emotion';
import React from 'react';
import {
  ListItem,
  ListGroup,
  getDate,
} from 'tuteria-shared/lib/shared/reusables';
import Link from 'react-router-dom/Link';
import { Button } from 'tuteria-shared/lib/shared/primitives';
export {
  AsLink,
  DetailItem,
  getTime,
  SectionListPage,
  DetailHeader,
  PVerificationListItem,
  RequestListItem,
} from 'tuteria-shared/lib/shared/reusables';
export { ListItem, ListGroup, getDate, Link };

export class ReviewForm extends React.Component {
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
      <form onSubmit={this.onSubmit}>
        <textarea
          css={css`
            width: 100%;
            margin-top: 16px;
            padding: 16px;
            font-size: 16px;
            box-sizing: border-box;
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
            display: block;
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
      </form>
    );
  }
}
