import { UserprofileAttributes } from 'config/types';

export const getSelectedTreatmentValue = (profileAttr: UserprofileAttributes[]) => profileAttr?.find((item) => item?.name === 'voice')?.value || '';