import React from 'react';
import { PrioritylNote } from 'features/bank/PriorityNotes';
import { FormType } from 'features/bank/PriorityNotes/hoc/withForm';

const PrioritylNotePage = () => <PrioritylNote formType={FormType.NEW} />;

export default PrioritylNotePage;
