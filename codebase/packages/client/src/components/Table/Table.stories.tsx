import React from 'react';
import { Meta, Story } from '@storybook/react';
import Table from './Table';
import { TableProps as Props } from './types';

export default {
  title: 'components/Table',
  component: Table,
} as Meta;

const Template: Story<Props> = (props) => {
  return <Table {...props} />;
};

export const BaseTable = Template.bind({});
Template.args = {
  currentItems: [
    {
      colleagueUuid: 'f3eab81e-b52a-466f-9898-9b7b1af3e4f7',
      employeeNo: 'UKE12375189',
      firstName: 'Marius',
      howAchieved: '1111111111111',
      howOverAchieved: '1111111111111',
      jobTitle: 'Colleague',
      lastName: 'Bruma',
      lineManager: 'Marius Bruma',
      objectiveNumber: 1,
      strategicDriver: 'Magnetic Value',
      title: '1111111111111',
      workingLevel: 'WL5',
    },
    {
      colleagueUuid: 'c8727e57-8844-4db5-b1b3-7548b7582244',
      employeeNo: 'UKE12375185',
      firstName: 'Mykola',
      howAchieved: '33333333333333',
      howOverAchieved: '33333333333333',
      jobTitle: 'Manager',
      lastName: 'Kotov',
      lineManager: 'Mykola Kotov',
      objectiveNumber: 15,
      strategicDriver: 'Easily the most convenient',
      title: '33333333333333',
      workingLevel: 'WL4',
    },
  ],
  tableTitles: [
    'Employee No',
    'Employee UUID',
    'First Name',
    'Surname',
    'Working level',
    'Job title',
    'Line manager',
    'Objective number',
    'Link to Strategic priorities',
    'Objective',
    'How do I know I`ve ACHIEVED this objective?',
    'How do I know I`ve OVER-ACHIEVED this objective?',
  ],
};
