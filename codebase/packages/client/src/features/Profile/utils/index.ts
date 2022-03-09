import get from 'lodash.get';

import RequiredFields from '../config/requiredFields';

// TODO: type info
export const getMissedFields = (info: any) => RequiredFields.filter((field) => {
  const firstLevel = get(info, field);
  const contactLevel = get(info, `data.colleague.contact.${field}`);
  const profileLevel = get(info, `data.colleague.profile.${field}`);
  const firstLevelRule = !firstLevel && firstLevel !== 0 && firstLevel !== false;
  const contactLevelRule = !contactLevel && contactLevel !== 0 && contactLevel !== false;
  const profileLevelRule = !profileLevel && profileLevel !== 0 && profileLevel !== false;

  return firstLevelRule && contactLevelRule && profileLevelRule;
});

