// @ts-ignore
import React from 'react';
import { FormType } from '@pma/store';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import ColleagueReview, { TEST_WRAPPER_ID } from './ColleagueReview';
import { SchemaFixtureVariables } from 'utils/test/fixtures/schema';
import { Status } from 'config/enum';
import { Timeline } from 'config/types';

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
      timeline: {
        uuid: 'uuid',
        colleagueCycleUuid: 'colleagueCycleUuid',
        code: 'OBJECTIVE',
        description: 'OBJECTIVE',
        type: 'REVIEW',
        startTime: '2022-09-01T00:00:00.000Z',
        endTime: '2022-09-15T00:00:00.000Z',
        status: 'STARTED',
        summaryStatus: 'WAITING_FOR_APPROVAL',
        reviewType: 'OBJECTIVE',
        lastUpdatedTime: '2022-09-09T07:19:52.076Z',
        statistics: {
          DRAFT: '1',
          DECLINED: '1',
          WAITING_FOR_APPROVAL: '1',
        },
      } as Timeline,
      status: Status.WAITING_FOR_APPROVAL,
      validateReview: jest.fn(),
      updateColleagueReviews: jest.fn(),
      colleagueUuid: 'colleagueUuid',
    };

    it('should render ColleagueReview component', () => {
      const { getByTestId } = render(<ColleagueReview {...props} />);
      expect(getByTestId(TEST_WRAPPER_ID)).toBeInTheDocument();
    });

    it('should render array of component', () => {
      const { getByText } = render(<ColleagueReview {...props} />);
      expect(getByText(props.schema.components[0].text)).toBeInTheDocument();
    });
  });
});
