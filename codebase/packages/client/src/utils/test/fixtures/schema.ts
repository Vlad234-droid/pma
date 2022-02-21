import { initialState, InitialStateType } from '@pma/store/src/entities/schema/reducer';
import { FormType } from '@pma/store';

export enum SchemaFixtureVariables {
  TEXT_FIELD_LABEL_OBJECTIVE = 'textfield label objective',
  TEXT_OBJECTIVE = 'text objective',
}

const metadata = {
  cycle: {
    id: 'group_a',
    code: 'group_a',
    description: 'null',
    type: 'CYCLE',
    properties: {
      pm_cycle_before_start: 'P2W',
      pm_cycle_type: 'fiscal',
      pm_type: 'cycle',
      pm_cycle_max: '5',
      pm_cycle_before_end: 'P2W',
      pm_cycle_start_time: '2021-04-01',
    },
    cycleType: 'FISCAL',
    timelinePoints: [
      {
        id: 'endOfYearReview',
        code: 'Year-end review',
        description: 'Year-end review',
        type: 'REVIEW',
        properties: {
          pm_type: 'review',
          pm_form_key: 'forms/group_a_eyr.form',
          pm_review_max: '1',
          pm_review_min: '1',
          pm_review_type: 'eyr',
          pm_review_duration: 'P2W',
          pm_review_before_end: 'P1W',
          pm_review_start_time: '2022-03-15',
          pm_review_start_delay: 'P1Y',
          pm_review_before_start: 'P2W',
        },
        reviewType: 'EYR',
        form: {
          id: 'group_a_eyr_mock',
          code: 'forms/group_a_eyr.form',
          description: null,
          type: 'FORM',
          properties: {},
          key: 'forms/group_a_eyr.form',
        },
      },
      {
        id: 'midYearReview',
        code: 'Mid-year review',
        description: 'Mid-year review',
        type: 'REVIEW',
        properties: {
          pm_type: 'review',
          pm_form_key: 'forms/standard_myr.form',
          pm_review_max: '1',
          pm_review_min: '1',
          pm_review_type: 'myr',
          pm_review_duration: 'P2W',
          pm_review_before_end: 'P1W',
          pm_review_start_time: '2021-10-01',
          pm_review_start_delay: 'P6M',
          pm_review_before_start: 'P2W',
        },
        reviewType: 'MYR',
        form: {
          id: 'standard_myr_mock',
          code: 'forms/standard_myr.form',
          description: null,
          type: 'FORM',
          properties: {},
          key: 'forms/standard_myr.form',
        },
      },
      {
        id: 'objectives',
        code: 'My Objectives',
        description: 'My Objectives',
        type: 'REVIEW',
        properties: {
          pm_type: 'review',
          pm_form_key: 'forms/standard_objective.form',
          pm_review_max: '2',
          pm_review_min: '2',
          pm_review_type: 'objective',
          pm_review_duration: 'P2W',
          pm_review_before_end: 'P1W',
          pm_review_start_time: '2021-04-01',
          pm_review_before_start: 'P2W',
        },
        reviewType: 'OBJECTIVE',
        form: {
          id: 'standard_objective_mock',
          code: 'forms/standard_objective.form',
          description: null,
          type: 'FORM',
          properties: {},
          key: 'forms/standard_objective.form',
        },
      },
    ],
  },
};

const forms = [
  {
    id: 'group_a_eyr_mock',
    code: 'forms/group_a_eyr.form',
    description: null,
    type: 'FORM',
    properties: {},
    key: 'forms/group_a_eyr.form',
    json: {
      schemaVersion: 2,
      components: [
        {
          text: 'text eyr',
          type: FormType.TEXT,
          id: 'Field_0wbgg9g',
          expression: {},
        },
        {
          label: 'textfield eyr',
          type: FormType.TEXT_FIELD,
          id: 'Field_0geokc1',
          key: FormType.TEXT_FIELD,
          validate: {
            required: true,
            maxLength: 500,
            minLength: 10,
          },
          expression: {},
        },
      ],
      exporter: {
        name: 'form-js (https://demo.bpmn.io)',
        version: '0.4.1',
      },
      type: 'default',
      id: 'group_a_eyr_form',
    },
  },
  {
    id: 'standard_myr_mock',
    code: 'forms/standard_myr.form',
    description: null,
    type: 'FORM',
    properties: {},
    key: 'forms/standard_myr.form',
    json: {
      schemaVersion: 2,
      components: [
        {
          text: 'text myr',
          type: FormType.TEXT,
          id: 'Field_0wbgg9g',
          expression: {},
        },
        {
          label: 'textfield myr',
          type: FormType.TEXT_FIELD,
          id: 'Field_0geokc1',
          key: FormType.TEXT_FIELD,
          validate: {
            required: true,
            maxLength: 500,
            minLength: 10,
          },
          expression: {},
        },
      ],
      type: 'default',
      id: 'standard_myr_form',
    },
  },
  {
    id: 'standard_objective_mock',
    code: 'forms/standard_objective.form',
    description: null,
    type: 'FORM',
    properties: {},
    key: 'forms/standard_objective.form',
    json: {
      schemaVersion: 2,
      components: [
        {
          text: SchemaFixtureVariables.TEXT_OBJECTIVE,
          type: FormType.TEXT,
          id: 'Field_0wbgg9g',
          expression: {},
        },
        {
          label: SchemaFixtureVariables.TEXT_FIELD_LABEL_OBJECTIVE,
          type: FormType.TEXT_FIELD,
          id: 'Field_0geokc1',
          key: FormType.TEXT_FIELD,
          validate: {
            required: true,
            maxLength: 500,
            minLength: 10,
          },
          expression: {},
        },
      ],
      exporter: {
        name: 'form-js (https://demo.bpmn.io)',
        version: '0.4.1',
      },
      type: 'default',
      id: 'standard_objective_form',
    },
  },
];

export class SchemaFixture {
  state;
  constructor(state?: InitialStateType) {
    this.state = state || initialState;
  }
  getInitialState() {
    return this;
  }
  withMetadata() {
    this.state = {
      meta: { ...this.state.meta, loaded: true },
      current: { metadata },
    };
    return this;
  }
  withForm() {
    this.state = {
      meta: { ...this.state.meta, loaded: true },
      current: { ...this.state.current, forms },
    };
    return this;
  }
}
