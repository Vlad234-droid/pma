import React from 'react';
import { FormType } from '@pma/store';

import { renderWithTheme as render } from 'utils/test';
import { ReviewType, Status } from 'config/enum';

import { ColleagueReview } from './ColleagueReview';

describe('<ColleagueReview />', () => {
  const props = {
    review: {
      uuid: '1111',
      number: 11,
      type: ReviewType.OBJECTIVE,
      properties: {
        mapJson: {
          11: 'default_value'
        }
      },
      status: Status.WAITING_FOR_APPROVAL,
    },
    schema: {
      components: [{
        id: '11',
        key: '11',
        text: '11_text',
        label: '11_label',
        description: '11_desc',
        type: FormType.TEXT,
        validate: {
          maxLength: '10'
        },
        values: [],
        expression: {}
      }]
    },
    validateReview: jest.fn(),
    updateColleagueReviews: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<ColleagueReview {...props} />);

      expect(getByTestId('colleague-review')).toBeInTheDocument();
    });

    it('should render title as review type - OBJECTIVE', () => {
      const { getByText } = render(<ColleagueReview {...props} />);

      expect(getByText('OBJECTIVE')).toBeInTheDocument();
    });

    it('should render title as review type - MYR', () => {
      const newProps = {
        ...props,
        review: {
          ...props.review,
          type: ReviewType.MYR,
        }
      };

      const { getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByText('MYR')).toBeInTheDocument();
    });

    it('should render title as review type - OBJECTIVE', () => {
      const newProps = {
        ...props,
        review: {
          ...props.review,
          type: ReviewType.EYR,
        }
      };

      const { getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByText('EYR')).toBeInTheDocument();
    });

    it('should render markdown, if component.type is TEXT', () => {
      const { getByText, getByTestId } = render(<ColleagueReview {...props} />);

      expect(getByTestId('markdown-renderer')).toBeInTheDocument();
      expect(getByText('11_text')).toBeInTheDocument();
    });

    it('should render Textarea component, if component.type is TEXT_FIELD, validate.maxLength > 100, there is permission and status is WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.TEXT_FIELD,
            validate: {
              maxLength: '101'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('generic-item-element')).toBeInTheDocument();
      expect(getByTestId('textarea-11')).toBeInTheDocument();
    });

    it('should render Input component, if component.type is TEXT_FIELD, validate.maxLength = 100, there is permission and status is WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.TEXT_FIELD,
            validate: {
              maxLength: '100'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('generic-item-element')).toBeInTheDocument();
      expect(getByTestId('input-11')).toBeInTheDocument();
    });

    it('should render Input component, if component.type is TEXT_FIELD, validate.maxLength < 100, there is permission and status is WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.TEXT_FIELD,
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('generic-item-element')).toBeInTheDocument();
      expect(getByTestId('input-11')).toBeInTheDocument();
    });

    it('should render Select component, if component.type is SELECT, there is permission and status is WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.SELECT,
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('generic-item-element')).toBeInTheDocument();
      expect(getByTestId('select-11-wrapper')).toBeInTheDocument();
    });

    it('should render default component, if component.type is other than TEXT, TEXT_FIELD, SELECT', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: 'OTHER',
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId, getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('colleague-review-default')).toBeInTheDocument();
      expect(getByTestId('colleague-review-value')).toBeInTheDocument();
      expect(getByText('11_label')).toBeInTheDocument();
      expect(getByText('default_value')).toBeInTheDocument();
    });

    it('should render default component, if component.type is TEXT_FIELD but no permission', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.TEXT_FIELD,
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [],
                }
              }
            }
          }],
        },
      };

      const { getByTestId, getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('colleague-review-default')).toBeInTheDocument();
      expect(getByTestId('colleague-review-value')).toBeInTheDocument();
      expect(getByText('11_label')).toBeInTheDocument();
      expect(getByText('default_value')).toBeInTheDocument();
    });

    it('should render default component, if component.type is TEXT_FIELD, here is permission but status is not WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        review: {
          ...props.review,
          status: Status.APPROVED,
        },
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.TEXT_FIELD,
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId, getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('colleague-review-default')).toBeInTheDocument();
      expect(getByTestId('colleague-review-value')).toBeInTheDocument();
      expect(getByText('11_label')).toBeInTheDocument();
      expect(getByText('default_value')).toBeInTheDocument();
    });

    it('should render default component, if component.type is SELECT but no permission', () => {
      const newProps = {
        ...props,
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.SELECT,
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [],
                }
              }
            }
          }],
        },
      };

      const { getByTestId, getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('colleague-review-default')).toBeInTheDocument();
      expect(getByTestId('colleague-review-value')).toBeInTheDocument();
      expect(getByText('11_label')).toBeInTheDocument();
      expect(getByText('default_value')).toBeInTheDocument();
    });

    it('should render default component, if component.type is SELECT, here is permission but status is not WAITING_FOR_APPROVAL', () => {
      const newProps = {
        ...props,
        review: {
          ...props.review,
          status: Status.APPROVED,
        },
        schema: {
          ...props.schema,
          components: [{
            id: '11',
            key: '11',
            text: '11_text',
            label: '11_label',
            description: '11_desc',
            type: FormType.SELECT,
            validate: {
              maxLength: '99'
            },
            values: [],
            expression: {
              auth: {
                permission: {
                  write: [1, 2],
                }
              }
            }
          }],
        },
      };

      const { getByTestId, getByText } = render(<ColleagueReview {...newProps} />);

      expect(getByTestId('colleague-review-default')).toBeInTheDocument();
      expect(getByTestId('colleague-review-value')).toBeInTheDocument();
      expect(getByText('11_label')).toBeInTheDocument();
      expect(getByText('default_value')).toBeInTheDocument();
    });
  });
});
