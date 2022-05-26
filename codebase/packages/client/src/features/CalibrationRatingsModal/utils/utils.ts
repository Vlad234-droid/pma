import { FormType } from '@pma/store';
import { Notification } from '../config';

export const fieldsSpecifity = [
  'Below expected contribution',
  'Satisfactory contribution',
  'Great contribution',
  'Outstanding contribution',
];

const getFieldOptions = (t) => [
  { value: 'Below expected contribution', label: t('expected_contribution', 'Below expected contribution') },
  { value: 'Satisfactory contribution', label: t('satisfactory_contribution', 'Satisfactory contribution') },
  { value: 'Great contribution', label: t('great_contribution', 'Great contribution') },
  { value: 'Outstanding contribution', label: t('outstanding_contribution', 'Outstanding contribution') },
];
export const getFields = (t, values) => [
  {
    name: 'what',
    label: t('select_your_what_rating', 'Select your colleague’s “What” rating'),
    placeholder: t('select'),
    options: getFieldOptions(t),
    type: FormType.SELECT,
  },
  {
    name: 'how',
    label: t('select_your_how_rating', 'Select your colleague’s “How” rating'),
    placeholder: t('select'),
    options: getFieldOptions(t),
    type: FormType.SELECT,
  },
  { type: Notification.NOTIFICATION_TILE, name: 'noti' },
  { type: 'line', name: 'line' },
  {
    type: FormType.RADIO,
    label: t(
      'is_your_colleague_on_long_term_absence_from_the_business',
      'Is your colleague on long-term absence from the business?',
    ),
    name: 'longTerm',
  },
  values.longTerm && {
    name: 'absent',
    label: t('select_a_reason_why_colleague_is_absent', 'Select a reason why colleague is absent'),
    placeholder: t('select'),
    options: [
      { value: 'Parental leave', label: t('parental_leave', 'Parental leave') },
      { value: 'Long term absence', label: t('long_term_absence', 'Long term absence') },
      { value: 'Good leaver', label: t('good_leaver', 'Good leaver') },
    ],
    type: FormType.SELECT,
  },
];

export const defaultValues = {
  longTerm: 'Yes',
};
