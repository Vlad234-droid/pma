// @ts-ignore
import React from 'react';
import { FormType } from '@pma/store';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import ColleagueReview, { TEST_WRAPPER_ID } from './ColleagueReview';
import { SchemaFixtureVariables } from 'utils/test/fixtures/schema';
import { ReviewType, Status } from 'config/enum';

describe('<ColleagueReview />', () => {
  describe('#render', () => {
    const props = {
      review: {
        type: 'OBJECTIVE',
        properties: {
          textfield: 'textfield_textfield',
        },
      },
      schema: {
        reviews: [
          {
            number: 1,
            status: 'WAITING_FOR_APPROVAL',
            type: 'OBJECTIVE',
            properties: {
              textfield: 'textfield_textfield',
            },
            uuid: '181673cb-7a1f-492e-b7b2-f80f9686b49c',
          },
        ],
        components: [
          {
            label: SchemaFixtureVariables.TEXT_FIELD_LABEL_OBJECTIVE,
            type: FormType.TEXT,
            id: 'Field_0geokc1',
            key: FormType.TEXT_FIELD,
            validate: {
              required: false,
              maxLength: 500,
            },
            expression: {},
            text: 'test text',
          },
        ],
      },
      reviewType: ReviewType.OBJECTIVE,
      status: Status.WAITING_FOR_APPROVAL,
      validateReview: jest.fn(),
      updateColleagueReviews: jest.fn(),
    };

    it('should render ColleagueReview component', () => {
      const { getByTestId } = render(<ColleagueReview {...props} />);
      expect(getByTestId(TEST_WRAPPER_ID)).toBeInTheDocument();
    });

    it('should render array of component', () => {
      const { getByTestId, getByText } = render(<ColleagueReview {...props} />);
      expect(getByText(props.schema.components[0].text)).toBeInTheDocument();
    });
  });
});
