import React from 'react';

import { Meta, Story } from '@storybook/react';

import StepIndicator, { StepIndicatorProps } from './StepIndicator';
import { Status } from 'config/enum';

export default {
  title: 'components/StepIndicator',
  component: StepIndicator,
} as Meta;

const Template: Story<StepIndicatorProps> = (args) => <StepIndicator {...args} />;

export const StepIndicatorPending = Template.bind({});
StepIndicatorPending.args = {
  currentStatus: Status.PENDING,
  currentStep: 0,
  titles: ['Set objectives', 'Mid-year review', 'Year-end review'],
  descriptions: ['April 2021', 'September 2022', 'March 2022'],
};

export const StepIndicatorDraft = Template.bind({});
StepIndicatorDraft.args = {
  currentStatus: Status.DRAFT,
  currentStep: 1,
  titles: ['Set objectives', 'Mid-year review', 'Year-end review'],
  descriptions: ['April 2021', 'September 2022', 'March 2022'],
};

export const StepIndicatorConfirmed = Template.bind({});
StepIndicatorConfirmed.args = {
  currentStatus: Status.APPROVED,
  currentStep: 2,
  titles: ['Set objectives', 'Mid-year review', 'Year-end review'],
  descriptions: ['April 2021', 'September 2022', 'March 2022'],
};

export const StepIndicatorWithoutDescription = Template.bind({});
StepIndicatorWithoutDescription.args = {
  currentStatus: Status.APPROVED,
  currentStep: 2,
  titles: ['Set objectives', 'Mid-year review', 'Year-end review'],
};
